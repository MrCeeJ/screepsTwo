const roleDrone = require('ai.drone');
const roleWorker = require('ai.worker');
const roleUpgrader = require('ai.upgrader');
const roleMiner = require('ai.miner');
const roleTransporter = require('ai.transporter');
const roleTower = require('ai.tower');
const profiles = require('profiles');
const screepFactory = require('screepFactory');
const log = require('log');
const planner = require('planner');

const drones = [];
const workers = [];
const upgraders = [];
const miners = [];
const transporters = [];

const roomManager = {

    runCreeps: function (room) {
        for (const name in room.find(FIND_MY_CREEPS)) {
            //noinspection JSUnfilteredForInLoop
            const creep = Game.creeps[name];
            switch (creep.memory.role) {
                case 'drone' : {
                    drones.push(creep);
                    roleDrone.run(creep);
                    break;
                }
                case 'worker': {
                    workers.push(creep);
                    roleWorker.run(creep);
                    break;
                }
                case 'upgrader': {
                    upgraders.push(creep);
                    roleUpgrader.run(creep);
                    break;
                }
                case 'miner': {
                    miners.push(creep);
                    roleMiner.run(creep);
                    break;
                }
                case 'transporter': {
                    transporters.push(creep);
                    roleTransporter.run(creep);
                    break;
                }
            }
        }
    },
    runTowers: function (room) {
        _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_TOWER)
            .map(t => roleTower.run(t))
            .value();
    },
    spawnCreeps: function (room) {
        const profile = profiles.getScreepsProfile(Memory.rooms[room.name].techLevel);
        if (drones.length < profile.maxDrones) {
            log.message(room.name + " needs more drones " + drones.length + " / " + profile.maxDrones);
            screepFactory.spawnDrone(room);
        }
        if (miners.length < profile.maxMiners) {
            log.message(room.name + " needs more miners " + miners.length + " / " + profile.maxMiners);
            screepFactory.spawnMiner(room);
        } else if (miners.length === profile.maxMiners) {
            let dyingMiners = [];
            _.forEach(miners, m => {
                if (!m.memory.replaced && m.ticksToLive < (m.memory.ticksToArrive + (m.body.length * 3))) {
                    dyingMiners.push(m);
                }
            });
            if (dyingMiners.length) {
                log.message("Spawning replacement for :" + dyingMiners[0]);
                screepFactory.spawnReplacementMiner(room, dyingMiners[0]);
            }
        }
        if (workers.length < profile.maxWorkers) {
            log.message(room.name + " needs more workers " + workers.length + " / " + profile.maxWorkers);
            screepFactory.spawnWorker(room);
        }
        if (upgraders.length < profile.maxUpgraders) {
            log.message(room.name + " needs more upgraders " + upgraders.length + " / " + profile.maxUpgraders);
            screepFactory.spawnUpgrader(room);
        }
        if (transporters.length < profile.maxTransporters) {
            log.message(room.name + " needs more transporters " + transporters.length + " / " + profile.maxTransporters);
            screepFactory.spawnTransporter(room);
        }
    },
    planRoom: function (room) {
        if (Game.time % 10 === 0) {
            log.message("planning room : " + room.name);
            planner.planRoom(room)
        }
    }
};

module.exports = 'roomManager';