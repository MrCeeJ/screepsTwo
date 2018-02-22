let lastLogTime;
const delay = 7;
const logGameStateDelay = 10;

const log = {

    message: function (message, stuff) {
        console.log(stuff ? message + " :" + stuff : message);
        lastLogTime = Game.time;
    },

    object: function (message, object) {
        console.log(message ? message : 'object', JSON.stringify(object));
        lastLogTime = Game.time;
    },

    creep: function (creep, message, override) {
        if (override || creep.memory.log) {
            console.log(message + ' : '+creep.memory.role + ':' + creep.name);
            lastLogTime = Game.time;
        }
    },

    tick: function () {
        const currentTime = Game.time;
        const timeDiff = currentTime - lastLogTime;
        if (timeDiff > delay) {
            console.log("Nothing much happening, another " + delay + " ticks go by.");
            lastLogTime = Game.time;
        }
    },

    logGameState: function (room, drones, miners, workers, upgraders, transporters, profile) {
        console.log("::::  " + room.name + "  ::::");
        console.log("Time is :" + Game.time);
        console.log("Drones ["+drones.length +"/"+ profile.maxDrones+"]:" + JSON.stringify(_.map(drones, c => c.name + ":" + c.memory.state + " (" + c.ticksToLive + ")")));
        console.log("Miners ["+miners.length +"/"+ profile.maxMiners+"]:" + JSON.stringify(_.map(miners, c => c.name + ":" + c.memory.state +  "[" + c.memory.position.x + "," + c.memory.position.y + "] (" + c.ticksToLive + "/" + ((c.body.length * 3) + c.memory.ticksToArrive) + ")")));
        console.log("Workers ["+workers.length +"/"+ profile.maxWorkers+"]:" + JSON.stringify(_.map(workers, c => c.name + ":" + c.memory.state + " (" + c.ticksToLive + ")")));
        console.log("Upgraders ["+upgraders.length +"/"+ profile.maxUpgraders+"]:" + JSON.stringify(_.map(upgraders, c => c.name + ":" + c.memory.state + " (" + c.ticksToLive + ")")));
        console.log("Transporters ["+transporters.length +"/"+ profile.maxTransporters+"]:" + JSON.stringify(_.map(transporters, c => c.name + ":" + c.memory.state + " (" + c.ticksToLive + ")")));
        lastLogTime = Game.time;
    },
    data: function (rooms) {
        for (const i in rooms) {
            //noinspection JSUnfilteredForInLoop
            console.log(":: Debugging room :" + i);
            if (rooms[i] !== undefined) {
                console.log("spawns :" + rooms[i].spawns);
                console.log("energySources :" + rooms[i].energySources);
                console.log("mineralSources :" + rooms[i].mineralSources);
                console.log("maxCreeps :" + rooms[i].maxCreeps);
                console.log("maxWorkers :" + rooms[i].maxWorkers);
                console.log("maxMiners :" + rooms[i].maxMiners);
                console.log("maxUpgraders :" + rooms[i].maxUpgraders);
                console.log("maxTransporters :" + rooms[i].maxTransporters);
            }

        }

    }
};

module.exports = log;