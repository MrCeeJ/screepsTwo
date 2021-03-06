const log = require('log');

const lattice = [{x: 1, y: 1}, {x: -1, y: 1}, {x: -1, y: -1}, {x: 1, y: -1}, {x: 2, y: 0}, {x: 2, y: 2},
    {x: 0, y: 2}, {x: -2, y: 2}, {x: -2, y: 0}, {x: -2, y: -2}, {x: 0, y: -2}, {x: 2, y: -2}, {x: 3, y: -1},
    {x: 3, y: 1}, {x: 3, y: 3}, {x: 1, y: 3}, {x: -1, y: 3}, {x: -3, y: 3}, {x: -3, y: 1}, {x: -3, y: -1},
    {x: -3, y: -3}, {x: -1, y: -3}, {x: 1, y: -3}, {x: 3, y: -3},
    {x: 4, y: -4}, {x: 4, y: -2}, {x: 4, y: 0}, {x: 4, y: 2}, {x: 4, y: 4},
    {x: 2, y: 4}, {x: 0, y: 4}, {x: -2, y: 4},
    {x: -4, y: 4}, {x: -4, y: 2}, {x: -4, y: 0}, {x: -4, y: -2}, {x: -4, y: -4},
    {x: 2, y: -4}, {x: 0, y: -4}, {x: -2, y: -4},
    {x: 1, y: -5}, {x: 2, y: -5}, {x: 3, y: -5}, {x: 4, y: -5},
    {x: -1, y: -5}, {x: -2, y: -5}, {x: -3, y: -5}, {x: -4, y: -5},
    {x: 1, y: 5}, {x: 3, y: 5}, {x: -1, y: 5}, {x: 3, y: 5},
    {x: 5, y: 1}, {x: 5, y: 3}, {x: 5, y: 5},
    {x: 5, y: -1}, {x: 5, y: -3}, {x: 5, y: -5},
    {x: -5, y: 1}, {x: -5, y: 3}, {x: -5, y: 5},
    {x: -5, y: -1}, {x: -5, y: -3}, {x: -5, y: -5},
    {x: -6, y: -6}, {x: -6, y: -4}, {x: -6, y: -2}, {x: -6, y: 0}, {x: -6, y: 2}, {x: -6, y: 4}, {x: -6, y: 6},
    {x: 6, y: -6}, {x: 6, y: -4}, {x: 6, y: -2}, {x: 6, y: 0}, {x: 6, y: 2}, {x: 6, y: 4}, {x: 6, y: 6},
    {x: -4, y: -6}, {x: -2, y: -6}, {x: 0, y: -6}, {x: 2, y: -6}, {x: 4, y: -6},
    {x: -4, y: 6}, {x: -2, y: 6}, {x: 0, y: 6}, {x: 2, y: 6}, {x: 4, y: 6},
    {x: -7, y: -7}, {x: -7, y: -4}, {x: -7, y: -3}, {x: -7, y: -1}, {x: -7, y: 1}, {x: -7, y: 3}, {x: -7, y: 4}, {x: -7, y: 7},
    {x: 7, y: -7}, {x: 7, y: -4}, {x: 7, y: -3}, {x: 7, y: -1}, {x: 7, y: 1}, {x: 7, y: 3}, {x: 7, y: 4}, {x: 7, y: 7},
    {x: -5, y: -7}, {x: -3, y: -7}, {x: -1, y: -7}, {x: 1, y: -7}, {x: 3, y: -7}, {x: 5, y: -7},
    {x: -5, y: 7}, {x: -3, y: 7}, {x: -1, y: 7}, {x: 1, y: 7}, {x: 3, y: 7}, {x: 5, y: 7},
    {x: -8, y: -8}, {x: -8, y: -6}, {x: -8, y: -4}, {x: -8, y: -2}, {x: -8, y: 0}, {x: -8, y: 2}, {x: -8, y: 4}, {x: -8, y: 6}, {x: -8, y: 8},
    {x: 8, y: -8}, {x: 8, y: -6}, {x: 8, y: -4}, {x: 8, y: -2}, {x: 8, y: 0}, {x: 8, y: 2}, {x: 8, y: 4}, {x: 8, y: 6}, {x: 8, y: 8},
    {x: -6, y: -8}, {x: -4, y: -8}, {x: -2, y: -8}, {x: 0, y: -8}, {x: 2, y: -8}, {x: 4, y: -8}, {x: 6, y: -8},
    {x: -6, y: 8}, {x: -4, y: 8}, {x: -2, y: 8}, {x: 0, y: 8}, {x: 2, y: 8}, {x: 4, y: 8}, {x: 6, y: 8},
    {x: -9, y: -9},{x: -9, y: -7}, {x: -9, y: -5},{x: -9, y: -3},{x: -9, y: 1},{x: -9, y: 1},{x: -9, y: 3},{x: -9, y: 5},{x: -9, y:7},{x: -9, y: 9},
    {x: 9, y: -9},{x: 9, y: -7}, {x: 9, y: -5},{x: 9, y: -3},{x: 9, y: 1},{x: 9, y: 1},{x: 9, y: 3},{x: 9, y: 5},{x: 9, y:7},{x: 9, y: 9},
    {x: -7, y: -9},{x: -5, y: -9},{x: -3, y: -9},{x: -1, y: -9},{x: 1, y: -9},{x: 3, y: -9},{x: 5, y: -9},{x: 7, y: -9},
    {x: -7, y: 9},{x: -5, y: 9},{x: -3, y: 9},{x: -1, y: 9},{x: 1, y: 9},{x: 3, y: 9},{x: 5, y: 9},{x: 7, y: 9},
];

const roomUtils = {


    numberOfPlannedAndRealStructures: function (room, structureType) {
        return this.countPlannedStructures(room, structureType) + this.countStructures(room, structureType);
    },
    countStructures: function (room, structureType) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === structureType)
            .size();
    },
    countPlannedStructures: function (room, structureType) {
        return _(room.find(FIND_CONSTRUCTION_SITES))
            .filter(s => s.structureType === structureType)
            .size();
    },
    findUnusedSources: function (room) {
        const energySourceIds = Memory.rooms[room.name].energySourceIds;
        const usedSourceIds = _(room.find(FIND_MY_CREEPS))
            .filter(s => s.memory.role === 'miner')
            .map(s => s.memory.sourceId)
            .value();

        return _.difference(energySourceIds, usedSourceIds);
    },
    findEnergySourceIdsInRoom: function (room) {
        const containers = _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_CONTAINER)
            .value();

        const ids = [];
        for (const c in containers) {
            ids.push(containers[c].id);
        }
        return ids;
    },
    findUnusedPositions: function (room, sourceIds) {
        let miningPositions = roomUtils.getMiningPositions(room, sourceIds);
        const usedPositions = _(room.find(FIND_MY_CREEPS))
            .filter(s => s.memory.role === 'miner')
            .map(s => s.memory.pos)
            .value();
        // TODO: verify this works for positions :)
        return _.reject(miningPositions, s => _.some(usedPositions, s));
    },
    findNearestLink: function (room, position) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_LINK)
            .sortBy(s => _(s.pos.getRangeTo(position)))
            .map(s => s.id)
            .first();
    },
    findStructurePositions: function (room, structureType) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === structureType)
            .map(s => s.pos)
            .value();
    },
    findStructures: function (room, structureType) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === structureType)
            .value();
    },
    getMiningPositions: function (room, energySources) {
        const positions = [];
        const spawns = room.find(FIND_MY_SPAWNS);

        for (const source in energySources) {
            const spaces = roomUtils.nonWallPositionsNextToCoordinates(room, Game.getObjectById(energySources[source]).pos.x, Game.getObjectById(energySources[source]).pos.y);
            const target = _(spaces).sortBy(s => _(s.findPathTo(spawns[0].pos, {
                ignoreCreeps: true,
                ignoreRoads: true
            })).size()).first();
            positions.push(target);
        }
        return positions;
    },
    nonWallPositionsNextToCoordinates: function (room, x, y) {
        log.message("Checking for spaces by [" + x + "," + y + "]");
        const area = room.lookAtArea(y - 1, x - 1, y + 1, x + 1, true);
        log.message("Found :", area);
        let spaces = [];
        for (const a in area) {
            if (area[a].type === "terrain" && area[a].terrain !== 'wall' && (x !== area[a].x || y !== area[a].y)) {
                spaces.push(new RoomPosition(area[a].x, area[a].y, room.name));
            }
        }
        return spaces;
    },
    getNonRoadConstructionSiteTypes: function (room) {
        return _(room.find(FIND_CONSTRUCTION_SITES))
            .filter(s => s.structureType !== STRUCTURE_ROAD)
            .map(s => s.structureType)
            .value();
    },
    containsOnlyRoadConstructionSites: function (room) {
        let sites = _(room.find(FIND_CONSTRUCTION_SITES))
            .filter(s => s.structureType !== STRUCTURE_ROAD)
            .size();
        return sites === 0;
    },

    containsNoConstructionSites: function (room) {
        let sites = _(room.find(FIND_CONSTRUCTION_SITES))
            .size();
        return sites === 0;
    },

    buildInitialContainers: function (room) {
        const energyLocationIds = Memory.rooms[room.name].energySourceIds;
        const spawnIds = Memory.rooms[room.name].spawnIds;
        for (const e of energyLocationIds) {
            let locations = roomUtils.nonWallsNextToLocation(room, Game.getObjectById(energyLocationIds[e]).pos);
            if (roomUtils.hasBuildingOrSite(locations, STRUCTURE_CONTAINER)) {
                break;
            }
            let goodLocations = roomUtils.findSpacesWithoutBuildingsOrSites(room, locations, energyLocationIds[e]);

            if (_(goodLocations).size() === 0) {
                log.message("Warning, unable to find good site for container");
            }
            else {
                let positions = roomUtils.getPositions(room, goodLocations);
                const containerLocation = _(positions).sortBy(s => _(s.findPathTo(Game.getObjectById(spawnIds[0]).pos)).size()).first();
                room.createConstructionSite(containerLocation.x, containerLocation.y, STRUCTURE_CONTAINER);
            }
        }
    },
    buildInitialLinks: function (room) {
        const positions = this.findStructurePositions(room, STRUCTURE_CONTAINER);
        const spawnIds = Memory.rooms[room.name].spawnIds;
        for (let i = 0; i < positions.length; i++) {
            const p = positions[i];
            const locations = this.nonWallPositionsNextToCoordinates(room, p.x, p.y);
            const emptyLocations = this.findSpacesWithoutBuildingsOrSites(room, locations);
            const sortedPositions = _(emptyLocations)
                .sortBy(s => _(s.getRangeTo(Game.getObjectById(spawnIds[0]).pos)))
                .first();
            if (sortedPositions) {
                room.createConstructionSite(sortedPositions.x, sortedPositions.y, STRUCTURE_LINK);
            } else {
                log.object("Unable to place link at :", p);
            }
        }
    },
    identifyLinks: function (room) {
        const links = this.findStructures(room, STRUCTURE_LINK);
        const sortedLinks = _(links)
            .sortBy(s => _(s.getRangeTo(Game.getObjectById(spawnIds[0]).pos)))
            .value();

        Memory.rooms[room.name].linkDestinationId = sortedLinks[0].id;
    },
    nonWallsNextToLocation: function (room, pos) {
        const area = room.lookAtArea((pos.y) - 1, (pos.x) - 1, (pos.y) + 1, (pos.x) + 1, true);
        let spaces = [];
        for (const a in area) {
            if (area[a].type === "terrain" && area[a].terrain !== 'wall' && (pos.x !== area[a].x || pos.y !== area[a].y)) {
                spaces.push(new RoomPosition(area[a].x, area[a].y, room.name));
            }
        }
        return spaces;
    },
    hasBuildingOrSite: function (locations, structure) {
        for (const loc in locations) {
            let contents = locations[loc].look();
            let structures = contents['structure'];
            for (const s in structures) {
                if (structures[s].structureType === structure)
                    return true;
            }
            let sites = contents['constructionSite'];
            for (const s in sites) {
                if (sites[s].structureType === structure)
                    return true;
            }
        }
        return false;
    },
    findSpacesWithoutBuildingsOrSites: function (room, locations) {
        const spaces = [];
        for (const l in locations) {
            const structures = _(room.lookForAt(LOOK_STRUCTURES, locations[l].x, locations[l].y)).reject(s => s.structureType === STRUCTURE_ROAD).value();
            const sites = _(room.lookForAt(LOOK_CONSTRUCTION_SITES, locations[l].x, locations[l].y)).reject(s => s.structureType === STRUCTURE_ROAD).value();

            if (_(structures).size() === 0 && _(sites).size() === 0) {
                log.message("Empty space found at [" + locations[l].x + "," + locations[l].y + "]");
                spaces.push(locations[l]);
            }
        }
        return spaces;
    },
    getPositions: function (room, locations) {
        const positions = [];
        for (const loc in locations) {
            const pos = new RoomPosition(locations[loc].x, locations[loc].y, room.name);
            positions.push(pos);
        }
        return positions;
    },
    getPositionsFromIds: function (room, ids) {
        const positions = [];
        for (const id in ids) {
            const pos = Game.getObjectById(ids[id]).pos;
            positions.push(pos);
        }
        return positions;
    },
    connectContainersAndSpawns: function (room) {
        const spawnIds = Memory.rooms[room.name].spawnIds;
        const containerIds = _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_CONTAINER)
            .map(s => s.id)
            .value();

        Memory.rooms[room.name].sourceContainerIds = containerIds;
        log.message("Creating spawn paths from:" + JSON.stringify(spawnIds) + " to :" + JSON.stringify(containerIds));
        for (const s in spawnIds) {
            const spawn = Game.getObjectById(spawnIds[s]);
            const start = spawn.pos;
            for (let c in containerIds) {
                const container = Game.getObjectById(containerIds[c]);
                const end = container.pos;
                log.message("Pathing from " + JSON.stringify(start) + " to " + JSON.stringify(end) + ".");
                const path = room.findPath(start, end, {ignoreCreeps: true, ignoreRoads: true});
                roomUtils.buildRoadAlongPath(room, path);
            }
        }
    },
    connectController: function (room) {
        let roadPositions = _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_ROAD)
            .map(s => s.pos)
            .value();

        let closest;
        if (roadPositions.length !== 0) {
            closest = room.controller.pos.findClosestByRange(roadPositions);
        } else {
            closest = roomUtils.getSpawns(room)[0].pos;
        }
        const path = room.findPath(closest, room.controller.pos, {ignoreCreeps: true, ignoreRoads: true});
        roomUtils.buildRoadAlongPath(room, path);
    },

    buildRoadAlongPath: function (room, path) {
        for (const p in path) {
            room.createConstructionSite(path[p].x, path[p].y, STRUCTURE_ROAD);
        }
    },

    getSpawns: function (room) {
        return _(room.find(FIND_STRUCTURES))
            .filter(s => s.structureType === STRUCTURE_SPAWN)
            .value();
    },

    buildExtensions: function (room, number) {
        this.buildNextLatticeBuilding(room, STRUCTURE_EXTENSION, number);
    },
    buildTowers: function (room, number) {
        this.buildNextLatticeBuilding(room, STRUCTURE_TOWER, number);
    },
    buildNextLatticeBuilding: function (room, structure, number) {
        let latticePosition = Memory.rooms[room.name].latticePosition;
        const spawnPos = roomUtils.getSpawns(room)[0].pos;
        for (let i = 0; i < number; i++) {
            let found = false;
            let position;
            while (!found) {
                position = roomUtils.getNextLatticePosition(spawnPos, latticePosition);
                latticePosition++;
                if (position.x < 2 ||
                    position.y < 2 ||
                    position.x > 47 ||
                    position.y > 47) {
                    continue;
                }
                const result = position.createConstructionSite(structure);
                if (result === 0) {
                    found = true;
                } else {
                    log.message("Error :" + result + " - Unable to build at ", position);
                }
            }
        }
        Memory.rooms[room.name].latticePosition = latticePosition;
    },
    getNextLatticePosition: function (pos, index) {
        const offset = lattice[index];
        return new RoomPosition(pos.x + offset.x, pos.y + offset.y, pos.roomName);
    },

    resetConstructionSites: function (room) {
        log.message("Clearing construction sites.");
        Memory.rooms[room.name].resetConstructionSites = false;
        let sites = _(room.find(FIND_CONSTRUCTION_SITES))
            .value();
        for (const site in sites) {
            sites[site].remove();
        }
    },
};

module.exports = roomUtils;
