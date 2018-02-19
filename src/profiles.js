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

const advancedProfile = {
    maxDrones: 0,
    maxWorkers: 2,
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
            case 'LEVEL_2':
                return advancedProfile;
            case 'Energy_L1':
            case 'Tower_L0':
            case 'LEVEL_3':
                return advancedProfile;
            case 'Energy_L2':
            case 'Storage_L0':
            case 'LEVEL_4' :
                return advancedProfile;
            case 'Energy_L3':
            case 'Link_L0' :
            case 'Tower_L1':
            case 'LEVEL_5' :
                return advancedProfile;
            case 'Energy_L4':
            case 'Link_L1' :
            case 'Extractor_L0':
            case 'LEVEL_6' :
                return advancedProfile;
            default : {
                log.message("Warning, tech level not covered in profiles", techLevel);
                return basicProfile;
            }
        }
    },

};

module.exports = profiles;