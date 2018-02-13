const log = require('log');

const roomUtils = {
    numberOfPlannedAndRealStructures: function (room, structureType) {
        return this.countPlannedStructures(room, structureType) + this.countStructures(room, structureType);
    },
    countPlannedStructures: function (room, structureType) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === structureType)
            .value().length;
    },
    countStructures: function (room, structureType) {
        return _(room.find(FIND_CONSTRUCTION_SITES))
            .filter(s => s.structureType === structureType)
            .value().length;
    },
    findUnusedSources: function(room) {
        const energySourceIds = Memory.rooms[room.name].energySourceIds;
        const usedSourceIds = _(room.find(FIND_MY_CREEPS))
            .filter(s => s.memory.role === 'miner')
            .map(s => s.memory.sourceId)
            .value();

        return _.reject(energySourceIds, s => _.some(usedSourceIds, s));
    },
    findUnusedPositions: function(room, sourceIds) {
        let miningPositions = roomUtils.getMiningPositions(room, sourceIds);
        const usedPositions = _(room.find(FIND_MY_CREEPS))
            .filter(s => s.memory.role === 'miner')
            .map(s => s.memory.pos)
            .value();

        return _.reject(miningPositions, s => _.some(usedPositions, s));
    },
    getMiningPositions: function (room, energySources) {
        const positions = [];
        const spawns = room.find(FIND_MY_SPAWNS);

        for (const source in energySources) {
            const spaces = roomUtils.nonWallPositionsNextToCoordinates(room, Game.getObjectById(energySources[source]).pos.x, Game.getObjectById(energySources[source]).pos.y);
            log.object("spaces :", spaces);
            const target = _(spaces).sortBy(s => _(s.findPathTo(spawns[0].pos, {
                ignoreCreeps: true,
                ignoreRoads: true
            })).size()).first();
            positions.push(target);
        }
        return positions;
    },
    nonWallPositionsNextToCoordinates: function (room, x, y) {
        const area = room.lookAtArea(y - 1, x - 1, y + 1, x + 1, true);
        let spaces = [];
        for (const a in area) {
            if (area[a].type === "terrain" && area[a].terrain !== 'wall' && (x !== area[a].x || y !== area[a].y)) {
                spaces.push(new RoomPosition(area[a].x, area[a].y, room.name));
            }
        }
        return spaces;
    },
};

module.exports = roomUtils;