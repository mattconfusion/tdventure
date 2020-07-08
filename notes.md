```
 _      ___        __   __ _____         __   __ 
| |_   /   /\   /\/__/\ \ /__   \/\ /\  /__\ /__\
| __| / /\ \ \ / /_\/  \/ / / /\/ / \ \/ \///_\  
| |_ / /_// \ V //_/ /\  / / /  \ \_/ / _  //__  
 \__/___,'   \_/\__\_\ \/  \/    \___/\/ \_\__/  
                                                 
```

# DEV NOTES

## Challenges
ASCII art: outputting art correctly

## Project aim
Create a game system capable of playing text avdentures written using a single(?) JS file using a data driven approach. The system will be CLI only, text / ascii art driven.

## Inspiration
Not really a text game, but an hybrid text/ASCII art precursor to the whole genre of roguelikes: DND by D. M. Lawrence and its DOS port by RO Software (http://www.roguebasin.com/index.php?title=DND && http://www.digital-eel.com/files/dndpage_files/DND.htm).

Tech inspiration from https://github.com/arvindr21/cli-adventure-games and many other discussions on forums regarding a data driven approach to console text adventure games.

Tech used:
- node.js
- vorpal.js and inquirer (included)
- inquirer auto-complete plugin

## Game system
The game is based on "rom" or "cartridge" folder files, contained into the */games* folder.
Every game must have its own subfolder (_eg: tdventure/games/myadventure_).

The game exposes cli commands to select a game to play. Once selected, all control shifts from vopal commands to inquirer prompts.

Through this prompts the player inputs commands used both for *Game Commands* and *Service Commands*.

### Cartridge Files
The (mostly) data-driven approach of *TDVENTURE* requires the game deigner to define his own game using Javascript objects. The choice for JS objects instead of JSON files is supported by the ability of defining and using constants. 

The core concepts of data contained in the cartridge files are three:
- Scenes, which represent generally situations in the game much like movies scripts define
- Items, which represent objects (but also abilities etc.) the player can acquire and use in the game
- Flags to define _scenarios_, which are simple boolean values used to define consequences of player actions.
- Commons, which contain common game settings, title, credits, start and end points...
- Stats, representing quantities applied to the player or generally to the system

*Scenes* and *Items* share some common behaviours like the usage of *Flags* ans *Stats*, the ability of triggering the output of text and/or ASCII art.

#### Scenes
The scene describe a point in the game in which the player is required to use certain commands in order to progress. Other systems define similar objects using the concept of rooms. In **TDVENTURE** the game designer is allowed to give the desired meaning to each scene: it can be a room, a part of a room, but also an encounter, or any other game crossroad.

Scenes are objects contained in properties.

Anatomy of a scene:
- id: which is the name of the property
- name: a human readable name that will appear on the bottom line of the console
- description: a human readable short description that the game will output whenever the player visists the room
- commands.

The commands are strings defining which actions the player can take on the current scene.
The "INVENTORY" and "USE" commands - which are string that can be changed - are reserved to the game system, as well as "SAVE GAME/LOAD GAME/EXIT GAME" service commands. See *Service commands* and *Game Commands* paragraphs. 
Inside each command, we have different scenarios.

Two special flags are used in case the scene involves using passwords to prove a previous game has been finished:

- require_password: an optional flag, pointing out that the scene requires the user to enter a password.
- show_password: once executed the scene will show a password to the player.

#### Scenarios in scenes
Every command can act differently based on how *Flags* are set in the current game status. Each command must have a list of such flags and the game engine use them as in a switch case structure.
The first flag found to be true defines the scenario that will be used. Even if NO FLAGS ARE USED the game designer must implement the default case scenario using the reserved and non-editable keyword "DEFAULT_SCENARIO" (use constants please!).

Each scenario is defined by these properties:
- text: the output text that will be shown when the command is used. Please refer to the "Output Text" parapgraph.
- required_items: an array of items ids required for the command. This is most commonly used in the "USE" command, which will accept the items listed. Other commands will only verify if these items are in possession of the player; otherwise a "You're missing something to do this" message will be shown.
- new_items: an array of items available to be picked up. The prompt for picking up items will be shown after the text output for the command. So you can walk trough a doorway and find coins on the floor. Yay!
- set_flags: key-value pairs defining which flag is set to true or false by using this command. This will allow a certain action on a certain scene to alter the game behaviour in following actions/scenes. Again, use constants please.
- repeats: an advanced option allowing you to create situations in which the same command must be repeated a number of times in order to work properly. This allows the game designer to envision nice tricks to challenge the player. The repetitions count will be reset every time the player exits the current scene. If not found it defaults to 1.
- set_stats: key-value pairs defining which stat will be altered when the scenario is played, and how much
- goto: finally, if the command can proceed, it will make the game point to the specified scene. If the value is "null" the scene won't change by using the current command. This can be useful to make the player perform multiple actions in the same scene, linking each one using flags and scenarios.

#### Hiding items in scenes commands
When an item id is found on the new_items array the prompt for picking it up is automatically shown. This can be prevented by prefixing the id with "@": this will silence the prompt and the item will be auto-added to the inventory. This can be useful in situations where the adding of the item in the inventory is considered implicit or to have fun situations where an object is added to the player's inventory without any warning; it could be something good, or something evil...

#### Scene Passwords
Passwords are generated (or validated) in the same way a save/load game routine would work. They allow the game engine to preset the game status so that you can share status over multiple cartridges; you could have the player finish the game in "cartridge A" which contains episode 1 and start right where it was left off in "cartridge B" which would contain episode 2.

When a scene contains the "show_password" flag the game engine will generate and show to the user a password for future use.
Once a scene contains the "require_password" flag the **TDVENTURE** engine will show a prompt for it and it will validate it. If it is valid the game engine will start the game at the predefined start scenes, otherwise the prompt will be brough back up again.

#### Items
Items are entities which can be acquired and stored in the player inventory during the game. They are subject to almost the same rules and structures of scenes, using flags to define scenarios which can only alter the description of the item, since the behavior of the item is defined in the scene. 

#### Scenarios for items
As with scenes a "DEFAULT_SCENARIO" fallback case is always needed; as with scenes you define a scenario bygiving the id of the flag that has to be checked: as with scenes the corresponding scenarion of the first flag proven to be true determines the scenario that will be played. Items once picked or used can setup flags thus altering the game status and creating more crossways in the player experience.

The properties of each item are these:
- use_text: as with scenes, the output text that will be shown when the item is used with the USE command. Refer to the "Output Text" paragraph for the specifications, ASCII art usage, etc.
- pick_text: same as the previous property, but shown when the item is there to be picked or looked at using the INVENTORY command.
- use_set_flags: key-value pairs detailing which flags will be altered when using this item
- use_set_stats: key-value pairs detailing how much a stat must be increased or decreased in using the item
- pick_set_flags: key-value pairs detailing which flags will be altered when picking this item.
- pick_set_stats: key-value pairs detailing how much a stat must be increased or decreased in picking the item
- remove_when_used: boolean value, default to false, that removes the item when used

#### Flags
Flags are simple boolean values the game designer can use to determine preconditions or changes in the game environment. Their simple nature allows the designer to trigger different reactions to a player action. These must be detailed as properties and setup in the initial game status, defining which flag is set to true or false. A not found flag will be considered false by default when used by the game engine on scenes and items.

#### Stats
Stats are scalar integer values with a minimum and maximum and starting values. When minimum or maximum are defined and reached the game engine brings the player to a certain scene. Stats are changed in their values in scenarios.

The properties of each stat are:
- id: the id of the stat
- name: name of the stat
- show_stat: boolean value telling the game engine wether to show the stat or not
- start: starting value of the stat
- max: maximum value reachable by the stat before going to scene id specified in max_goto
- min: minimum value reachable by the stat before going to scene id specified in min_goto
- max_goto: scene id when the stat value is over the defined max value
- min_goto: scene id when the stat value is under the defined min_value
- max_set_flags: array of flags to set when stat value is over the defined max value
- min_set_flags: array of flags to set when stat value is under the defined min value

#### Wrapping it up...
So the designer could use a scene to describe an encounter with a villain; the magic sword required to kill the villain would be defined as an item, an item required to execute the command "kill". But killing the villain will break the magic sword. Once the "kill" command, which has a repeat quota of 2, is launched 2 times, a couple of flags will be set: one defining that the certain villain is dead, one defining that the sword has been broken. If the sword will be used again with a USE command or when it will be looked at from the INVENTORY command two scenarios using the broken flag will determine what the player can do or see. If the player returns again to the same scene, the flag set when the villain was slain will trigger the description of a dead body in the room instead of a vile bastard waiting for the player.

### Game routines
Once the game is started, the game object will preload all the initial game status, including start inventory items, start flags, and copying the start scene in the current scene property. If the start scenes are multiple, a randomized choice will start the game in of the them.

Then the common scene routine will begin:

1. The bottom bar will feature the scene name and the stats to be shown (if any)
2. The description of the area will be displayed
3. Command history for the current scene will be initialized, erasing the previous one
4. The prompt will wait for commands

Once a command is received and parsed, a check will determine the command nature

- if command is among the "service" commands, proper routines will be invoked
- if command is "USE" or "INVENTORY", or their corresponding values, the respective special routines will be called

Otherwise the common scene-defined command routine will act in the following way:

1. Check if the command exists in the current scene; otherwise, tell the player they can't do that
2. For the existing command, determine which scenario applies according to flags. Fallback case is "DEFAULT_SCENARIO"
3. Check if for the current scenario item requirements are met, checking the current game status inventory
4. Updating the command history for the scene; check with the command history if the repeat quota is met for the command
5. Printing to the console the text for the current command
6. Setting flags (in the background) if any flag is specified
7. Adjusting stats value (in the background) if any stat is specified, and interrupting gameplay if min or max are reached and goto options are set, or setting flags accordingly
7. If new items are available and (they are not prefixed with @), the pick prompt is shown to the player, invoking PICK command routines
8. If goto has value, the game will be finally moving to a new scene id, resetting command history and current scene.

If the scene to which goto brings is indicated as one of the final scenes the game ends printing out the text in the scene description. The credits will follow

#### Use items
The USE command prompts a selection of items from the player's inventory. The selected items must match the list of items specified in the USE command of the current scene. The routine is slightly different from the one for cartridge defined commands. Flags defined on the item itself will be set accordingly after each use, even if the repeat quota on the scene is not met.

1. If no USE command exists for the current scene, the game does not alert the player with an error message, so the game is not giving clues wether an item must be used in the scene
2. Scenario is chosen in the usual way
3. Check if the items selected match with the required items in the scenario
4. Output the use_text text defined in the item itself following the same scenario selection procedure
5. Set the use_flags defined in item itself
6. Adjusting stats value (in the background) if any stat is specified, and interrupting gameplay if min or max are reached
7. Update the command history and then check for command repeat quota in the scene for the current scenario
8. if the repeat quota is met, set the flags defined in the scenario of the scene
9. Output the text defined in the scenario of the scene, set flags, follow goto etc...
10. Remove the item if the remove_when_used flag is set to true

#### Pick items
The pickup of items is presented to the player via a prompt whenever a scenario of a certain command of a scene defines the id of new items available. In fact, if new_items array has a valid value:

1. The game engine checks if the item key is not already present in the current game inventory
2. According to the scenario defined on the item itself, the game will output the text contained in pick_text in the current item
3. The prompt will be a y/n choice: if the player accepts to pick up the item, pick_flags will be set.
4. Adjusting stats value if any stat is specified, and interrupting gameplay if min or max are reached

In case of rechargeable items, such as a vial of holy water, the game designer could organize his game like this:

- create a flag to determine if the vial is full
- create a scene where an item "vial" can be picked up
- create a scene where a fountain responds to the command USE on item "vial" which sets the vial flag to full
- create scenes involving the usage of the vial with two different scenarios based on the full flag

### Service commands
- NEW GAME/new game: resets the cartridge back to the start, starting a new game
- SAVE GAME/save game: Saves the current game status in a folder */save* inside the game folder. The prompt must ask for a name for the save refusing if the file already exists (using filter functions)
- LOAD GAME/load game: load a previously saved games. The prompts shows a list of previously saved files, if any; otherwise a message brings up the usual game prompt.
- EXIT GAME/exit game: prompting a confirmation menu, if "y" exits to the *TDVENTURE* shell

### Game commands
These commands are divided in "always available" and "cartridge defined". Always available are suggested by the command line using inquirer extension *auto-complete*.

#### Always available
- INVENTORY/inventory: brings up a selection of the items in inventory. One of the answers is "back", which brings the user back to the game prompt. Once an object is selected, info are displayed in the game, as detailed in the specific paragraph about *Inventory Routine*
- USE ITEM/use item: brings up the inventory selection. If the game scene does not allow usage for the selected item or any of the selected items 

It is possible to override these values in the *Command Cartridge Settings* so that you can have your game cartridge completely localized.

#### Cartridge defined
Basically any command can be defined by the game scenes. The suggested practice is to define such commands in constants when recurring (such as GO NORTH, GO SOUTH, OPEN DOOR etc) and to keep them as simple as possible. *TDVENTURE* parsing of commands is using a regex to match the words listed in the command in the order the command specifies. The regex used is like: `\bopen\b.*\bdoor\b`.

It is possible to define in the Cartridge property *suggestedCommands* which are the cartride-defined commands you want to make available through the game command autocomplete via an array of command ids.
