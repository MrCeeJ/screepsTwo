const log = require('log');

const startingProfile = {
    maxDrones: 4,
    maxWorkers: 0,
    maxMiners: 2,
    maxUpgraders: 1,
    maxTransporters: 0
};

const basicProfile = {
    maxDrones: 0,
    maxWorkers: 2,
    maxMiners: 2,
    maxUpgraders: 1,
    maxTransporters: 1
};

const level2Profile = {
    maxDrones: 0,
    maxWorkers: 1,
    maxMiners: 2,
    maxUpgraders: 4,
    maxTransporters: 1
};

const level3Profile = {
    maxDrones: 0,
    maxWorkers: 1,
    maxMiners: 2,
    maxUpgraders: 1,
    maxTransporters: 1
};

const advancedProfile = {
    maxDrones: 0,
    maxWorkers: 2,
    maxMiners: 2,
    maxUpgraders: 2,
    maxTransporters: 1
};
const powerConstruction = {
    maxDrones: 0,
    maxWorkers: 1,
    maxMiners: 2,
    maxUpgraders: 1,
    maxTransporters: 1
};
const hiTechProfile = {
    maxDrones: 0,
    maxWorkers: 1,
    maxMiners: 2,
    maxUpgraders: 2,
    maxTransporters: 1
};

const profiles = {

    getScreepsProfile: function (techLevel) {
        switch (techLevel) {
            case 'LEVEL_1':
            case 'NONE':
                return startingProfile;
            case 'Energy_L0':
            case 'Containers_L0':
                return advancedProfile;
            case 'LEVEL_2':
                return level2Profile;
            case 'Energy_L1':
            case 'Tower_L0':
                return level3Profile;
            case 'LEVEL_3':
                return level3Profile;
            case 'Energy_L2':
            case 'Storage_L0':
                return powerConstruction;
            case 'LEVEL_4' :
                return hiTechProfile;
            case 'Energy_L3':
            case 'Link_L0' :
            case 'Tower_L1':
               return powerConstruction;
            case 'LEVEL_5' :
                return hiTechProfile;
            case 'Energy_L4':
            case 'Link_L1' :
            case 'Extractor_L0':
                return powerConstruction;
            case 'LEVEL_6' :
                return hiTechProfile;
            default : {
                log.message("Warning, tech level not covered in profiles", techLevel);
                return basicProfile;
            }
        }
    },

};

module.exports = profiles;