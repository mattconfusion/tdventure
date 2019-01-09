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

// Flags here
const Flags = {
    [flagsIds.MONSTER_KILLED]: false,
    [flagsIds.TRAP_ACTIVE]: true,
    [flagsIds.SWORD_BLOODY]: false,
    [flagsIds.SWORD_USED]: false,
    [flagsIds.VIAL_OF_HOLY_WATER_FULL]: false,
    [flagsIds.EVIL_DISPELLED]: true
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

// Game settings here
const Cartridge = {
    title: ['Development Cartridge'],
    version: '0.1',
    description: ['A development cartridge file'],
    credits: ['Matteo Radice as The Main Dev'],
    startItems: [], //list of items ids
    startFlags: Flags, //dictionary of flag ids and values of the flags at the start of the game
    startScene: [], //list of the start scenes of the game (random choice if more than one)
    endScenes: [], // list of scenes id where the game ends, no matter in which way
    suggestedCommands: [cmds.GO_NORTH, cmds.GO_SOUTH, cmds.GO_EAST, cmds.GO_WEST], // list of commands that the game will try to autocomplete
    inventoryCommandString: null, // you can overwrite these special commands
    useCommandString: null, // by puttig here null you are not overwriting them
    commonMessages: {} // dictionary of common game messages to be overriden
};