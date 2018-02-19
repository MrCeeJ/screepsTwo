const roomUtils = require('roomUtils');
const roleDrone = require('aiDrone');
const roleWorker = require('aiWorker');
const roleUpgrader = require('aiUpgrader');
const roleMiner = require('aiMiner');
const roleTransporter = require('aiTransporter');
const roleTower = require('aiTower');
const profiles = require('profiles');
const screepFactory = require('screepFactory');
const log = require('log');
const planner = require('roomPlanner');

let drones = [];
let workers = [];
let upgraders = [];
let miners = [];
let transporters = [];
let profile = {};

const roomManager = {
    manage: function(room) {
        roomManager.resetConstructionSites(room);
        roomManager.runCreeps(room);
        roomManager.runTowers(room);
        roomManager.spawnCreeps(room);
        roomManager.planRoom(room);
        if (Game.time % 10 === 0) {
            roomManager.logCreeps(room);
        }
    },
    runCreeps: function (room) {

        drones = [];
        workers = [];
        upgraders = [];
        miners = [];
        transporters = [];
        profile = {};

        const creeps = room.find(FIND_MY_CREEPS);
        for (const name in creeps) {
            const creep = creeps[name];
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
        let capacity = screepFactory.getCapacity(room);
        if (capacity > 0) {
            profile = profiles.getScreepsProfile(Memory.rooms[room.name].techLevel);
            capacity = this.spawnBootstrap(room, capacity, profile);
            capacity = this.spawnDrones(room, capacity, profile);
            capacity = this.spawnMiners(room, capacity, profile);
            capacity = this.spawnTransporters(room, capacity, profile);
            capacity = this.spawnWorkers(room, capacity, profile);
            this.spawnUpgraders(room, capacity, profile);
        } else {
            log.message(room.name + " : all spawns currently busy.");
        }
    },
    spawnBootstrap: function (room, capacity, profile) {
        if (capacity > 0 && miners.length === 0 && profile.maxMiners > 0 && drones.length === 0) {
            log.message(room.name + " Is in trouble and needs bootstrapping ");
            screepFactory.spawnDrone(room);
            return --capacity;
        }
        return capacity;
    },
    spawnDrones: function (room, capacity, profile) {
        if (capacity > 0 && drones.length < profile.maxDrones) {
            log.message(room.name + " needs more drones " + drones.length + " / " + profile.maxDrones);
            screepFactory.spawnDrone(room);
            return --capacity;
        }
        return capacity;
    },
    spawnMiners: function (room, capacity, profile) {
        if (capacity > 0 && miners.length < profile.maxMiners) {
            log.message(room.name + " needs more miners " + miners.length + " / " + profile.maxMiners);
            screepFactory.spawnMiner(room);
            return --capacity;
        } else if (capacity > 0 && miners.length === profile.maxMiners) {
            let dyingMiners = [];
            _.forEach(miners, m => {
                if (!m.memory.replaced && m.ticksToLive < (m.memory.ticksToArrive + (m.body.length * 3))) {
                    dyingMiners.push(m);
                }
            });
            if (dyingMiners.length) {
                log.message("Spawning replacement for :" + dyingMiners[0]);
                screepFactory.spawnReplacementMiner(room, dyingMiners[0]);
                return --capacity;
            }
        }
        return capacity;
    },
    spawnWorkers: function (room, capacity, profile) {
        if (capacity > 0 && workers.length < profile.maxWorkers) {
            if ( miners.length >= 2) {
                log.message(room.name + " needs more workers " + workers.length + " / " + profile.maxWorkers);
                screepFactory.spawnWorker(room);
                return --capacity;
            } else {
                log.message(room.name + " needs more workers " + workers.length + " / " + profile.maxWorkers +" however not enough miners ("+miners.length+")");
            }
        }
        return capacity;
    },
    spawnUpgraders: function (room, capacity, profile) {
        if (capacity > 0 && upgraders.length < profile.maxUpgraders) {
            log.message(room.name + " needs more upgraders " + upgraders.length + " / " + profile.maxUpgraders);
            screepFactory.spawnUpgrader(room);
            return --capacity;
        }
        return capacity;
    },
    spawnTransporters: function (room, capacity, profile) {
        if (capacity > 0 && transporters.length < profile.maxTransporters) {
            log.message(room.name + " needs more transporters " + transporters.length + " / " + profile.maxTransporters);
            screepFactory.spawnTransporter(room);
            return --capacity;
        }
        return capacity;
    },
    planRoom: function (room) {
        if (Game.time % 10 === 0) {
            log.message("planning room : " + room.name);
            planner.planRoom(room)
        }
    },
    resetConstructionSites(room) {
        if (Memory.rooms[room.name].resetConstructionSites === true || Memory.rooms[room.name].resetConstructionSites === 'true') {
            roomUtils.resetConstructionSites(room);
            Memory.rooms[room.name].resetConstructionSites = false;
        }
    },
    logCreeps: function(room) {
        log.logGameState(room, drones, miners, workers, upgraders, transporters, profiles.getScreepsProfile(Memory.rooms[room.name].techLevel));
    }
};

module.exports = roomManager;