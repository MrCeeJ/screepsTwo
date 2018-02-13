let lastLogTime;
const delay = 7;

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
            console.log(creep.memory.role + ':' + creep.name + ': ' + message);
            lastLogTime = Game.time;
        }
    },

    tick: function () {
        const currentTime = Game.time;
        if (currentTime - lastLogTime > delay) {
            console.log("Nothing much happening, another " + delay + " ticks go by.");
            lastLogTime = Game.time;
        }
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