const roleDrone = require('ai.drone');
const roleWorker = require('ai.worker');
const roleUpgrader = require('ai.upgrader');
const roleMiner = require('ai.miner');
const roleTransporter = require('ai.transporter');
const log = require('log');
const roomUtils = require('roomUtils');

const screepFactory = {
    spawnScreep: function (room, body, role, memory) {
        const spawns = room.find(FIND_MY_SPAWNS);
        for (const s in spawns) {
            const result = spawns[s].createCreep(body, null, memory ? memory : {role: role, log: false});
            if (result === 0) {
                log.object(role + " under construction", body);
                return;
            }
            log.message("Unable to spawn " + role, result);
        }
        log.message("Failed to spawn " + role + "!");
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
        const memory = {role: 'miner', log: false, sourceId :sources[0] , position : positions[0]};
        this.spawnScreep(room, body, 'miner', memory);
    },
    spawnTransporter: function (room) {
        const body = roleTransporter.getBody(room.energyCapacityAvailable);
        this.spawnScreep(room, body, 'transporter');
    },
};
module.exports = screepFactory;