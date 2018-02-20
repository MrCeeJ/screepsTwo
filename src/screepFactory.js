const roleDrone = require('aiDrone');
const roleWorker = require('aiWorker');
const roleUpgrader = require('aiUpgrader');
const roleMiner = require('aiMiner');
const roleTransporter = require('aiTransporter');
const log = require('log');
const roomUtils = require('roomUtils');

const screepFactory = {
    spawnScreep: function (room, body, role, memory) {

        const spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length > 0) {
            for (const s in spawns) {
                if (spawns[s].spawning === null) {
                    if (spawns[s].room.energyCapacityAvailable >= this.spawnCost(body)) {
                        const result = spawns[s].createCreep(body, null, memory ? memory : {role: role, log: false});
                        if (result === 0) {
                            log.object(role + " under construction", body);
                            return;
                        } else if (result < 0) {
                            log.message("Unable to spawn " + role, result);
                        }
                        else {
                            log.object(role +" - "+result+ " under construction!", body);
                        }
                    } else {
                        log.message("Insufficient energy needed :" + this.spawnCost(body) + " found :" + spawns[s].energy);
                    }
                }
                else {
                    log.message("Spawn busy");
                }
            }
        }
        else {
            log.message("All spawns busy.");
        }
    },

    spawnDrone: function (room) {
        const body = roleDrone.getBody(150);
        this.spawnScreep(room, body, 'drone');
    },
    spawnWorker: function (room) {
        const body = roleWorker.getBody(room.energyCapacityAvailable);
        this.spawnScreep(room, body, 'worker');
    },
    spawnUpgrader: function (room) {
        const body = roleUpgrader.getBody(room.energyCapacityAvailable);
        this.spawnScreep(room, body, 'upgrader');
    },
    spawnMiner: function (room) {
        const body = roleMiner.getBody(room.energyCapacityAvailable);
        const sources = roomUtils.findUnusedSources(room);
        const positions = roomUtils.findUnusedPositions(room, sources);
        const memory = {role: 'miner', log: false, sourceId: sources[0], position: positions[0]};
        this.spawnScreep(room, body, 'miner', memory);
    },
    spawnReplacementMiner: function (room, oldMiner) {
        const body = [];
        for (let part in oldMiner.body) {
            body.push(oldMiner.body[part].type);
        }
        const memory = {
            role: 'miner',
            sourceId: oldMiner.memory.sourceId,
            position: oldMiner.memory.position,

        };
        this.spawnScreep(room, body, 'miner', memory);

        oldMiner.memory.replaced = true;
        log.object("Spawning replacement miner for :", oldMiner.memory.position);
    },
    spawnTransporter: function (room) {
        const body = roleTransporter.getBody(room.energyCapacityAvailable);
        this.spawnScreep(room, body, 'transporter');
    },
    spawnCost: function (body) {
        let cost = 0;
        for (const part in body) {
            cost += BODYPART_COST[body[part]];
        }
        return cost;
    },
    getCapacity: function (room) {
        let count = 0;
        const spawns = room.find(FIND_MY_SPAWNS);
        for (const s in spawns) {
            if (spawns[s].spawning === null) {
                count++;
            }
        }
        return count;
    }
};
module.exports = screepFactory;