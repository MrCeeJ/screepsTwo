const roomUtils = require('roomUtils');

const tech = {
    calculateTechLevel: function (room) {
        if (Memory.rooms[room.name]) {
            if (room.controller.level === 1) {
                return 'LEVEL_1';
            } else if (room.controller.level === 2) {
                if (room.energyCapacityAvailable < 550) {
                    return 'Energy_L0';
                }
                const energySites = Memory.rooms[room.name].energySourceIds.length;
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_CONTAINER) < energySites) {
                    return 'Containers_L0';
                }
                return 'LEVEL_2';
            } else if (room.controller.level === 3) {
                if (room.energyCapacityAvailable < 800) {
                    return 'Energy_L1';
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_TOWER) < 1) {
                    return 'Tower_L0';
                }
                return 'LEVEL_3';
            }
            else if (room.controller.level === 4) {
                if (room.energyCapacityAvailable < 1300) {
                    return 'Energy_L2';
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_STORAGE) < 1) {
                    return 'Storage_L0';
                }
                return 'LEVEL_4';
            }
            else if (room.controller.level === 5) {
                if (room.energyCapacityAvailable < 1800) {
                    return 'Energy_L3'
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_LINK) < 2) {
                    return 'Link_L0';
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_TOWER) < 2) {
                    return 'Tower_L1';
                }
                return 'LEVEL_5';
            }
            else if (room.controller.level === 6) {
                if (room.energyCapacityAvailable < 2300) {
                    return 'Energy_L4'
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_LINK) < 3) {
                    return 'Link_L1';
                }
                if (roomUtils.numberOfPlannedAndRealStructures(room, STRUCTURE_EXTRACTOR) < 1) {
                    return 'Extractor_L0';
                }
                // Labs
                // Terminal
                return 'LEVEL_6';
            }
        }
        return 'NONE';
    },

};
module.exports = tech;