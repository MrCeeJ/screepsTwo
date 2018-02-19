const log = require('log');
const data = require('data');
const roomManager = require('roomManager');

module.exports.loop = function () {

    log.tick();
    data.checkMemory();

    let currentRoom;
    for (const i in Memory.rooms) {
        currentRoom = Game.rooms[Memory.rooms[i].name];
        if (currentRoom === undefined) {
            data.resetMemory();
        } else {
            activateSafeMode(currentRoom);
            cleanupDeadScreepsFromMemory();
            roomManager.manage(currentRoom);
        }
    }

    function activateSafeMode(room) {
        const enemies = room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 2) {
            const username = enemies[0].owner.username;
            Game.notify(`User ${username} spotted in room :` + room);
            room.controller.activateSafeMode()
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
