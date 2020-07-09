//Use objects as container for constants value
const cmds = {
    GO_NORTH: 'go north',
    GO_SOUTH: 'go south',
    GO_EAST: 'go east',
    GO_WEST: 'go west',
    OPEN_DOOR: 'open door',
    CLOSE_DOOR: 'close door',
    LOOK: 'look'
}
const flagsIds = {
    TRAP_ACTIVE: 'trapActive',
    MONSTER_KILLED: 'monsterKilled',
    SWORD_BLOODY: 'swordIsBloody',
    SWORD_USED: 'swordHasBeenUsed',
    SWORD_MAGIC_EFFECT: 'swordMagicEffect',
    VIAL_OF_HOLY_WATER_FULL: 'vialOfHolyWaterIsFull',
    EVIL_DISPELLED: 'evilIsDispelled'
}
const itemsIds = {
    MAGIC_SWORD: 'magicSword',
    VIAL_OF_HOLY_WATER: 'vialOfHolyWater',
    AUBURN_KEY: 'auburnKey'
};
const scenesIds = {
    ENTRANCE: 'entrance',
    UNDEAD_GUARDIANS_ENCOUNTER: 'undeadGuardians',
    CORRIDOR1: 'corridor1',
    CANDLE_CHAMBER: 'candleChamber',
    BONES_CHAMBER: 'bonesChamber',
    CORRIDOR2: 'corridor2',
    FOUNTAIN_CHAMBER: 'fountainChamber',
    UNHOLY_CHAMBER: 'unholyChamber',
    EVIL_INCARNATED: 'evilIncarnated' 
};

// Flags here
const Flags = {
    [flagsIds.MONSTER_KILLED]: false,
    [flagsIds.TRAP_ACTIVE]: true,
    [flagsIds.SWORD_BLOODY]: false,
    [flagsIds.SWORD_USED]: false,
    [flagsIds.VIAL_OF_HOLY_WATER_FULL]: false,
    [flagsIds.EVIL_DISPELLED]: false,
    [flagsIds.BONES_CHAMBER_DOOR_CLOSED]: true,
    [flagsIds.CANDLE_CHAMBER_DOOR_CLOSED]: true
}

// Items here
const Items = {
    [itemsIds.MAGIC_SWORD]: {
        [flagsIds.SWORD_BLOODY]: {
            use_text: ['The blood stained blade of the sword cuts everything like butter'],
            pick_text: ['A bloody two hand sword stands in front of you'],
            use_set_flags: {[flagsIds.SWORD_USED]: true},
            pick_set_flags: {[flagsIds.SWORD_MAGIC_EFFECT]: true}
        },
        default_scenario: {
            use_text: ['The immaculate blade of the sword cuts everything like butter'],
            pick_text: ['A shiny two hand sword stands in front of you'],
            use_set_flags: {[flagsIds.SWORD_USED]: true},
            pick_set_flags: {[flagsIds.SWORD_MAGIC_EFFECT]: true}
        }
    },
    [itemsIds.VIAL_OF_HOLY_WATER]: {
        [flagsIds.VIAL_OF_HOLY_WATER_FULL]: {
            use_text: ['The water flows out of the vial'],
            pick_text: ['A vial filled with holy water'],
            use_set_flags: {[flagsIds.EVIL_DISPELLED]: true, VIAL_OF_HOLY_WATER_FULL: false},
            pick_set_flags: null
        },
        default_scenario: {
            use_text: ['The empty vial gets uncorked...'],
            pick_text: ['An empty vial with a small cork on top'],
            use_set_flags: {},
            pick_set_flags: {}
        }
    }
} 

// Scenes here
const Scenes = {
    [scenesIds.ENTRANCE]: {
        name: 'The Wooden Doorway',
        description: 'A wooden, heavy, double door is before you. It looks ancient.'
        //this cannot be opened unless the crowbar is used (USE). player cannot turn anywhere
    },
    [scenesIds.UNDEAD_GUARDIANS_ENCOUNTER]: {
        name: 'Beyond the door',
        description: 'It is very dark, but your noose picks up a vile stench.'
        // the guardians must be slained with the sword (monster killed flag) by using the sword two times. then you gan go north
        // going back to the door will kill you
    },
    [scenesIds.CORRIDOR1]: {
        name: 'The dark corridor',
        description: 'A long and dark corridor stands in front of you.'
        //looking allows you to discover two doorways to candle and bones chamber. you can open the door and enter 
    },
    [scenesIds.CANDLE_CHAMBER]: {
        name: 'A small chamber',
        description: 'A very small and damp chamber. A sweet scent of wax fills the air.'
        //looking you find a pile of objects, including the vial
    },
    [scenesIds.BONES_CHAMBER]: {
        name: 'A large chamber',
        description: 'A large chamber filled with tables, tools... and what you think may be human bones.',
        //looking at it it's an embalming room. a hidden switch among the bones deactivates the trap in corridor2
        commands: {
            [cmds.GO_EAST]: {
                default_scenario: {
                    // ...
                }
            }
        }
    }

}


// Cartridge
const Cartridge = {
    title: 'Development Cartridge',
    version: '0.1',
    description: ['A development cartridge file'],
    credits: ['Matteo Radice as The Main Dev'],
    start_items: [], //list of items ids
    start_flags: Flags, //dictionary of flag id and value of the flag at the start of the game
    start_scenes: [], //list of the start scenes of the game (random choice if more than one)
    end_scenes: [], // list of scenes id where the game ends, no matter in which way
    suggested_commands: [cmds.GO_NORTH, cmds.GO_SOUTH, cmds.GO_EAST, cmds.GO_WEST], // list of commands that the game will try to autocomplete
    inventory_command_string: null, // you can overwrite these special commands
    use_command_string: null, // by puttig here null you are not overwriting them
    common_messages: {} // dictionary of common game messages to be overriden
};