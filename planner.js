const roomUtils = require('roomUtils');
const log = require('log');

const planner = {
    planRoom: function (room) {
        if (roomUtils.containsNoConstructionSites(room)) {
            techPlans[Memory.rooms[room.name].techLevel](room);
        } else {
            log.message("Room: " + room.name + " still under construction.");
        }
    }
};

const BUILD_CONTAINERS = function (room) {
    if (Memory.rooms[room.name].techLevel === 'NONE') {
        log.message("Constructing containers for room: " + JSON.stringify(room));
        roomUtils.buildInitialContainers(room);
        Memory.rooms[room.name].techLevel = 'CONTAINERS';
    } else
        log.message("Warning, attempted to construct containers room in incorrect state :", Memory.rooms[room.name].techLevel);
};

const CONNECT_CONTAINERS = function (room) {
    if (Memory.rooms[room.name].techLevel === 'CONTAINERS') {
        roomUtils.connectContainersAndSpawns(room);
        Memory.rooms[room.name].techLevel = 'CONNECTED_CONTAINERS';
    } else
        log.message("Warning, attempted to connect containers in incorrect state :", Memory.rooms[room.name].techLevel);
};

const CONNECT_CONTROLLER = function(room) {
    if (Memory.rooms[room.name].techLevel === 'CONNECTED_CONTAINERS') {
        roomUtils.connectController(room);
        Memory.rooms[room.name].techLevel = 'CONNECTED_CONTROLLERS';
    } else
        log.message("Warning, attempted to connect controller in incorrect state :", Memory.rooms[room.name].techLevel);
};

const BUILD_L1_EXTENSIONS = function (room) {
    if (Memory.rooms[room.name].techLevel === 'CONNECTED_CONTROLLERS') {
        log.message("Attempted to build extensions in room:", room.name);
        roomUtils.buildExtensions(room, 10);
        Memory.rooms[room.name].techLevel = 'L1_STORES';
    }
    else
        log.message("Warning, attempted to build extensions in incorrect state :", Memory.rooms[room.name].techLevel);
};

const BUILD_LINK = function (room) {
    if (Memory.rooms[room.name].techLevel === 'L1_STORES') {
        log.message("Attempted to build link in room :" + room.name);
        // TODO: Write function
        //Memory.rooms[room.name].techLevel = 'LINKS';
    }
    else
        log.message("Warning, attempted to build links in incorrect state :", Memory.rooms[room.name].techLevel);
};

const BUILD_TOWERS = function (room) {
    if (Memory.rooms[room.name].techLevel === 'LINKS') {
        log.message("Attempted to build towers in room:", room.name);
        // TODO: Write function
        //Memory.rooms[room.name].techLevel = 'TOWERS';
    }
    else
        log.message("Warning, attempted to build towers in incorrect state :", Memory.rooms[room.name].techLevel);
};

/**
 A map from current room tech level to actions to move to the next one.
 */
const techPlans = {
    'NONE': BUILD_CONTAINERS,
    'CONTAINERS': CONNECT_CONTAINERS,
    'CONNECTED_CONTAINERS': CONNECT_CONTROLLER,
    'CONNECTED_CONTROLLERS': BUILD_L1_EXTENSIONS,
    'L1_STORES' : BUILD_LINK,
    'LINKS' : BUILD_TOWERS,
    'TOWERS' : undefined
};

module.exports = planner;
