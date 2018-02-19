const roomUtils = require('roomUtils');
const log = require('log');
const tech = require('tech');

const planner = {
    planRoom: function (room) {
        let sites = roomUtils.getNonRoadConstructionSiteTypes(room);
        if (sites.length === 0) {
            const oldTech = Memory.rooms[room.name].techLevel;
            const newTech = tech.calculateTechLevel(room);
            if (oldTech !== newTech) {
                log.message("<<< tech level upgraded >>> :" + newTech);
                Memory.rooms[room.name].techLevel = newTech;
                techPlans[Memory.rooms[room.name].techLevel](room);
            }
            else {
                log.message("Current tech level : " + oldTech);
            }
        } else {
            log.object("Room: " + room.name + " still under construction :", sites);
        }
    }
};

const DO_NOTHING = function () {
};

const BUILD_EXTENSIONS = function (room) {
    log.message("Constructing extensions for room: " + JSON.stringify(room));
    roomUtils.buildExtensions(room, 5);
};

const BUILD_CONTAINERS = function (room) {
    log.message("Constructing containers for room: " + JSON.stringify(room));
    roomUtils.buildInitialContainers(room);
};

const BUILD_LINK = function (room) {
    log.message("Attempted to build link in room but function not implemented yet:", room.name);
};

const BUILD_TOWERS = function (room) {
    roomUtils.buildTowers(room, 1);
};

const BUILD_STORES = function (room) {
    log.message("Attempted to build stores in room but function not implemented yet:", room.name);
};

const BUILD_EXTRACTOR = function (room) {
    log.message("Attempted to build extractor in room but function not implemented yet:", room.name);
};

/**
 A map from current room tech level to actions to move to the next one.
 */
const techPlans = {
    'LEVEL_1': DO_NOTHING,
    'Energy_L0': BUILD_EXTENSIONS,
    'Containers_L0': BUILD_CONTAINERS,
    'LEVEL_2': DO_NOTHING,
    'Energy_L1': BUILD_EXTENSIONS,
    'Tower_L0': BUILD_TOWERS,
    'LEVEL_3': DO_NOTHING,
    'Energy_L2': BUILD_EXTENSIONS,
    'Storage_L0': BUILD_STORES,
    'LEVEL_4': DO_NOTHING,
    'Energy_L3': BUILD_EXTENSIONS,
    'Link_L0': BUILD_LINK,
    'Tower_L1': BUILD_TOWERS,
    'LEVEL_5': DO_NOTHING,
    'Energy_L4': BUILD_EXTENSIONS,
    'Link_L1': BUILD_LINK,
    'Extractor_L0': BUILD_EXTRACTOR,
    'LEVEL_6': DO_NOTHING,
};

module.exports = planner;