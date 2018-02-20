const log = require('log');

const STATE_INITIALISING = function (creep) {
    log.creep(creep, 'Miner starting up!', true);
    if (creep.memory.position === undefined) {
        log.creep(creep, 'ALERT! No position defined', true);
        creep.say('Need Position!');
    } else if (creep.memory.sourceId === undefined) {
        log.creep(creep, 'ALERT! No source defined', true);
        creep.say('Need Source!');
    } else {
        creep.memory.state = 'MOVING';
        log.creep(creep, 'Moving to location [' + creep.memory.position.x + ',' + creep.memory.position.y + ']', true);
        return states[creep.memory.state](creep);
    }
};

const STATE_MOVING = function (creep) {
    if (creep.memory.position) {
        if (creep.pos.x === creep.memory.position.x && creep.pos.y === creep.memory.position.y) {
            //let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            let target = creep.memory.sourceId;
            const result = creep.harvest(Game.getObjectById(target));
            if (result === OK) {
                log.creep(creep, 'Arrived, mining from :' + target, true);
                creep.memory.state = 'MINING';
                creep.memory.ticksToArrive = 1500 - creep.ticksToLive;
            } else {
                log.creep(creep, 'Problem :' + result, true);
            }
        } else {
            log.creep(creep, 'Moving to :' + JSON.stringify(creep.memory.position));
            log.creep(creep, 'move result :' + creep.moveTo(creep.memory.position.x, creep.memory.position.y));
        }
    }
};

const STATE_MINING = function (creep) {
    let result = creep.harvest(Game.getObjectById(creep.memory.sourceId));
    log.creep(creep, "Just mining. :" + result, result !== 0);
};

const STATE_SOURCE_MINING = function (creep) {
    creep.transfer(Game.getObjectById(creep.memory.linkId), RESOURCE_ENERGY);
    creep.harvest(Game.getObjectById(creep.memory.sourceId));
    creep.transfer(Game.getObjectById(creep.memory.linkId), RESOURCE_ENERGY);
    log.creep(creep, "Just source mining. zzz");
};

const STATE_DESTINATION_MINING = function (creep) {
    creep.withdraw(Game.getObjectById(creep.memory.linkId), RESOURCE_ENERGY);
    creep.drop(RESOURCE_ENERGY);
    creep.harvest(Game.getObjectById(creep.memory.targetId));
    creep.withdraw(Game.getObjectById(creep.memory.linkId), RESOURCE_ENERGY);
    creep.drop(RESOURCE_ENERGY);
    log.creep(creep, "Just destination mining. zzz");
};

const states = {
    'INITIALISING': STATE_INITIALISING,
    'MOVING': STATE_MOVING,
    'MINING': STATE_MINING,
    'SOURCE': STATE_SOURCE_MINING,
    'DESTINATION': STATE_DESTINATION_MINING
};

const drone = {

    /**
     * Advanced miner AI file.
     *
     * @param energy **/

    getBody: function (energy) {

        if (energy >= 550) {
            return [WORK, WORK, WORK, WORK, WORK, MOVE];
        }
        else if (energy >= 450) {
            return [WORK, WORK, WORK, WORK, MOVE];
        }
        else if (energy >= 350) {
            return [WORK, WORK, WORK, MOVE];
        }
        else if (energy >= 250) {
            return [WORK, WORK, MOVE];
        }
        else {
            return [WORK, MOVE];
        }
    },

    getLinkBody: function (energy) {

        if (energy >= 600) {
            return [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
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