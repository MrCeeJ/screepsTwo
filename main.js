const log = require('log');
const data = require('data');
const roomManager = require('roomManager');

module.exports.loop = function () {

    log.tick();
    data.checkMemory();

    let currentRoom;
    for (const i in Memory.rooms) {
        currentRoom = Game.rooms[Memory.rooms[i].name];

        activateSafeMode();
        cleanupDeadScreepsFromMemory();
        roomManager.runCreeps(currentRoom);
        roomManager.runTowers(currentRoom);
        roomManager.spawnCreeps(currentRoom);
        roomManager.planRoom(currentRoom);

    }


    function activateSafeMode() {
        const enemies = currentRoom.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 2) {
            const username = enemies[0].owner.username;
            Game.notify(`User ${username} spotted in room :` + currentRoom);
            currentRoom.controller.activateSafeMode()
        }
    }

    function cleanupDeadScreepsFromMemory() {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

};
