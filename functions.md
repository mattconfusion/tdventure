```
 _      ___        __   __ _____         __   __ 
| |_   /   /\   /\/__/\ \ /__   \/\ /\  /__\ /__\
| __| / /\ \ \ / /_\/  \/ / / /\/ / \ \/ \///_\  
| |_ / /_// \ V //_/ /\  / / /  \ \_/ / _  //__  
 \__/___,'   \_/\__\_\ \/  \/    \___/\/ \_\__/  
                                                 
```

# FUNCTIONS IDEAS

The macro classes needed are *TUI* (text UI, it contains method to display prompts and text lines), *GameStatus* (it keeps track of player actions such as command history, stats, items and is ready to save game), *Engine* (which is the actual game Engine), *Inventory* (a minor class with all the inner works of inventory and items, like a sub-engine for game)

## Utils
1. random_choice(array of choices): value of the choice picked

## Game Functions
1. Engine.gameStart()
2. Engine.gameEnd()
3. Engine.playScene(string sceneId)
4. GameStatus.setCurrentScene(string sceneId)
5. GameStatus.setFlag(string flagId, bool status)
6. GameStatus.setStat(string statId, int absoluteValue)
7. TUI.showTitle()
8. TUI.showCredits()
9. Engine.stopCartridge()
10. Engine.evaluateFlags(array Flag objects): string flagId
11. Engine.playCmd(string sceneId, string cmdId)
12. TUI.renderSceneNameBar(string scenarioName)
13. TUI.renderStatsBar(array Stat objects)
14. TUI.printDescription(array strings)
15. TUI.promptForCmd(array<string> suggestedCmds): string inputFromPlayer
16. Engine.evaluateCmd(array<string> availableCmds): string chosenCmd 
17. TUI.warnInvalidCmd()
18. Engine.playScenario(string sceneId, string cmdId, string scenarioId)
19. Inventory.checkRequiredItems(array itemsId)
20. GameStatus.setCurrentItems(array itemsId)
21. GameStatus.alterStat(string statid, int deltaValue)
22. GameStatus.checkStatCondition(string statId, int currentAbsoluteValue)
23. TUI.warnRequirementsNotMet()
24. TUI.print(array strings)
25. Inventory.pickItem(string ItemId) 

### Engine.gameStart
1. Check the Cartridge.start_scenes array.
2. If more values are present, pick a random one
3. Set inventory with start_items content
4. Set flags with set_flags content
5. Set stats with set_stats content
6. Play scene

### Engine.gameEnd
1. Show the title
2. Show the credits
3. Back to tdventure command prompt

### Engine.playScene
1. Display description for the scenario 
2. Render bottom bar with correct scenario name
3. Render bottom bar for updated stats that must be shown
4. Prompt for player action
5. Evaluate command
6. If valid, play command

### Engine.playCommand
1. Evaluate flags
2. Play the scenario corresponding to the flag

### Engine.playScenario
1. Check scenario item requirements, otherwise replay Scene
2. Set flags for the scenario
3. Set stats for the scenario
4. Display text
5. Render bottom bar for updated stats that must be shown
6. If new items available, invoke either pick items function or silently add items to inventory

### Inventory.pickItem
1. Prompt text
2. Invoke add item

### Inventory.addItem
1. Add item to inventory array
2. Update the game stats with GameStatus.setCurrentItems

### Inventory.useItem

### Inventory.lookItem

### Inventory.removeItem

### Inventory.checkRequiredItems