const log = require('log');
const ai = require('aiToolkit');

const STATE_INITIALISING = function (creep) {
    log.creep(creep, "Upgrader starting up!", true);
    creep.memory.state = 'GATHERING';
    return states[creep.memory.state](creep);
};

const STATE_GATHERING = function (creep) {
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.state = 'UPGRADING';
        return states[creep.memory.state](creep);
    }
    return ai.gatherNearestDroppedEnergy(creep, creep.carryCapacity) || ai.gatherContainerEnergy(creep) || ai.gatherStoredEnergy(creep, creep.carryCapacity) || ai.harvestEnergy(creep);
};

const STATE_UPGRADING = function (creep) {
    if (creep.carry.energy === 0) {
        creep.memory.state = 'GATHERING';
        return states[creep.memory.state](creep);
    }
    ai.autoBuildRoad(creep, 1);
    return ai.upgradeRoom(creep);
};

const states = {
    'INITIALISING': STATE_INITIALISING,
    'GATHERING': STATE_GATHERING,
    'UPGRADING': STATE_UPGRADING
};

const drone = {

    /**
     * Upgrader AI file.
     *
     * @param energy **/

    getBody: function (energy) {

        if (energy >= 1200) {
            return [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 1000) {
            return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 800) {
            return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 650) {
            return [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        else if (energy >= 550) {
            return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        else if (energy >= 450) {
            return [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
        }
        else if (energy >= 350) {
            return [WORK, WORK, CARRY, CARRY, MOVE];
        }
        else if (energy >= 250) {
            return [WORK, CARRY, CARRY, MOVE];
        }
        else {
            return [WORK, CARRY, MOVE];
        }
    },

    run: function (creep) {
        if (creep.memory.state === undefined) {
            creep.memory.state = 'INITIALISING';
        }
        states[creep.memory.state](creep);
    }
};
module.exports = drone;