const log = require('log');
const ai = require('aiToolkit');

const STATE_INITIALISING = function (creep) {
    log.creep(creep, "Worker starting up!", true);
    creep.memory.state = 'GATHERING';
    return states[creep.memory.state](creep);
};

const STATE_GATHERING = function (creep) {
    const MIN_ENERGY = creep.carryCapacity;
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.state = 'WORKING';
        return states[creep.memory.state](creep);
    }
    return ai.gatherStoredEnergy(creep, creep.carryCapacity) || ai.gatherContainerEnergy(creep) || ai.gatherNearestDroppedEnergy(creep, MIN_ENERGY) || ai.revertToDrone(creep);
};

const STATE_WORKING = function (creep) {
    if (creep.carry.energy === 0) {
        creep.memory.state = 'GATHERING';
        return states[creep.memory.state](creep);
    }
    ai.autoBuildRoad(creep);
    return ai.buildBuildings(creep) || ai.repairBuildings(creep) || ai.repairWalls(creep) || ai.upgradeRoom(creep);
};

const states = {
    'INITIALISING': STATE_INITIALISING,
    'GATHERING': STATE_GATHERING,
    'WORKING': STATE_WORKING
};

const worker = {

    /**
     * Energy efficient worker.
     *
     * @param energy **/

    getBody: function (energy) {

        if (energy >= 1350) {
            return [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 1200) {
            return [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 1000) {
            return [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 800) {
            return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 700) {
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
        else if (energy >= 600) {
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        else if (energy >= 550) {
            return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        else if (energy >= 500) {
            return [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
        else if (energy >= 400) {
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        }
        else if (energy >= 300) {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
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
module.exports = worker;