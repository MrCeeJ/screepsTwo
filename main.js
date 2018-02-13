const log = require('log');
const data = require('data');
const roomManager = require('roomManager');

module.exports.loop = function () {

    log.tick();
    data.checkMemory();

    let roomData;
    let currentRoom;
    for (const i in Memory.rooms) {
        roomData = Memory.rooms[i];
        currentRoom = Game.rooms[roomData.name];

        activateSafeMode();
        removeDeadScreepsFromMemory();
        roomManager.runCreeps(currentRoom);
        roomManager.runTowers(currentRoom);
        roomManager.spawnCreeps(currentRoom);
    }



    function activateSafeMode() {
        const enemies = currentRoom.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 2) {
            const username = enemies[0].owner.username;
            Game.notify(`User ${username} spotted in room :` + currentRoom);
            currentRoom.controller.activateSafeMode()
        }
    }

    function removeDeadScreepsFromMemory() {
        for (let i in Memory.creeps) {
            //noinspection JSUnfilteredForInLoop
            if (!Game.creeps[i]) {
                //noinspection JSUnfilteredForInLoop
                delete Memory.creeps[i];
            }
        }
    }

};
