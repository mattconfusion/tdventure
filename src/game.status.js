module.exports = class GameStatus {
    constructor(flags, inventory, currentScene) {
        this.flags = flags;
        this.inventory = inventory;
        this.currentScene = currentScene;
        this.playedScenes = [currentScene];
        this.commandHistory = {};

        //currently unused
        this.droppedItems = {}; // {'sceneId': [itemId1, itemId2]}
    }

    /**
     * Gets the value for the flag. If not existing, is false
     * @param {string} flagId
     * @returns {boolean} 
     */
    getFlagValue(flagId) {
        if (!this.flags.hasOwnProperty(flagId)) {
            return false;
        }

        return Boolean(this.flags[flagId]);
    }

    /**
     * Sets the value for the flag
     * @param {string} flagId 
     * @param {boolean} value 
     */
    setFlagValue(flagId, value) {
        this.flags[flagId] = value;
    }

    /**
     * Checks if the specified item is in the inventory
     * @param {string} itemId
     * @returns {boolean} 
     */
    itemInInventory(itemId) {
        return this.inventory.includes(itemId);
    }

    /**
     * Adds item to inventory
     * @param {string} itemId 
     */
    addItemToInventory(itemId) {
        if (this.itemInInventory(itemId)) {
            return;
        }

        this.inventory.push(itemId);
    }

    /**
     * Removes item from inventory
     * @param {string} itemId 
     */
    removeItemFromInventory(itemId) {
        if (!this.itemInInventory(itemId)) {
            return;
        }

        this.inventory.pop(itemId);
    }

    /**
     * Drop an item from inventory into the current scene
     * @param {string} itemId 
     */
    dropItem(itemId) {
        if (!this.itemInInventory(itemId)
        || (this.droppedItems.hasOwnProperty(this.currentScene) 
        && this.droppedItems[this.currentScene].includes(itemId))) {
            return;
        }

        this.removeItemFromInventory(itemId);
        this.droppedItems[this.currentScene].push(itemId);
    }

    /**
     * Sets the current scene played
     * @param {string} sceneId 
     */
    setCurrentScene(sceneId) {
        this.currentScene = sceneId;        
    }

    /**
     * Gets the current scene being played
     * @returns {string} the scene id
     */
    getCurrentScene() {
        return this.currentScene; 
    }

    /**
     * Sets the scene as played (for 'You've already seen this before)
     * @param {string} sceneId 
     */
    setSceneAsPlayed(sceneId) {
        if (this.playedScenes.includes(sceneId)) {
            return;
        }
        this.playedScenes.push(sceneId);
    }

    /**
     * Get the repeats for command specified
     * @param {string} cmdId 
     * @returns {Number}
     */
    getCommandRepeats(cmdId) {
        if (!this.commandHistory.hasOwnProperty(cmdId)) {
            return 0;
        }

        return Number(this.commandHistory[cmdId]);
    }

    /**
     * Updates the command history for the specified command
     * @param {string} cmdId 
     */
    updateCommandHistory(cmdId) {
        if (!this.commandHistory.hasOwnProperty(cmdId)) {
            this.commandHistory[cmdId] = 0;
        }

        this.commandHistory[cmdId]++;
    }

    /**
     * Exports a JSON stringified snpshot of game status
     * @returns {string}
     */
    exportJsonSnapshot() {
        return JSON.stringify({
            flags: this.flags,
            inventory: this.inventory,
            currentScene: this.currentScene,
            playedScenes: this.playedScenes,
            commandHistory: this.commandHistory,
            droppedItems: this.droppedItems
        });
    }
};