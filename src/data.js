const log = require('log');
const tech = require('tech');

const defaults = {
    name: "",
    techLevel : "",
    latticePosition : 0,
    spawnIds: [],
    energySourceIds: [],
    sourceContainerIds: [],
};

const data = {

    checkMemory: function() {
        if (Memory.resetData === undefined || Memory.resetData === true || Memory.resetData === 'true' || Memory.rooms === undefined || Memory.rooms === []) {
            this.resetMemory();
        }
    },
    resetMemory: function () {
        log.message("Resetting memory data");
        Memory.rooms = {};
        Memory.resetData = false;

        for (const i in Game.spawns) {
            const r = Game.spawns[i].room;
            if (!Memory.rooms[r.name]){
                let location = defaults;
                location.name = r.name;
                location.spawnIds = this.getSpawnIds(r);
                location.energySourceIds = this.getSourceIds(r);
                location.techLevel = tech.calculateTechLevel(r);
                location.resetConstructionSites = false;
                Memory.rooms[r.name] = location;
            }
        }
    },
    getSpawnIds: function (room) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_SPAWN)
            .map(s => s.id)
            .value();
    },
    getSourceIds: function (room) {
        return _(room.find(FIND_SOURCES_ACTIVE))
            .map(s => s.id)
            .value();
    }

};

module.exports = data;