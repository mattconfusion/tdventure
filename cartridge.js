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
    MONSTER_KILLED: 'monsterKilled'
}
const itemsIds = {
    MAGIC_SWORD: 'magicSword',
    VIAL_OF_HOLY_WATER: 'vialOfHolyWater',
    AUBURN_KEY: 'auburnKey'
};

// Flags here
const Flags = {
    [flagsIds.MONSTER_KILLED]: false,
    [flagsIds.TRAP_ACTIVE]: true
}

// Items here
const Items = {} 

// Scenes here

// Cartridge
const Cartridge = {
    title: 'Development Cartridge',
    version: '0.1',
    description: ['A development cartridge file'],
    credits: ['Matteo Radice as The Main Dev'],
    startItems: [], //list of items ids
    startFlags: Flags, //dictionary of flag id and value of the flag at the start of the game
    startScenes: [], //list of the start scenes of the game (random choice if more than one)
    endScenes: [], // list of scenes id where the game ends, no matter in which way
    suggestedCommands: [cmds.GO_NORTH, cmds.GO_SOUTH, cmds.GO_EAST, cmds.GO_WEST], // list of commands that the game will try to autocomplete
    inventoryCommandString: null, // you can overwrite these special commands
    useCommandString: null, // by puttig here null you are not overwriting them
    commonMessages: {} // dictionary of common game messages to be overriden
};