let Configstore = require('configstore');
const dotProp = require('dot-prop');
let fs = require('fs');


let loader = (function (configFilePath, confExtraData = {}) {

    if(this.instance){
        return this.instance;
    }

    this.instance = null;

    if( ! fs.existsSync(configFilePath) ){
        console.error(`Config File Not Found(${configFilePath})`);
        process.exit(1);
    }

    let configFileData = require(configFilePath);

    let confEnv = {
        "PORT" : process.env.PORT || configFileData.PORT || 4000,
        "HOST" : process.env.HOST || configFileData.HOST || 'localhost',
    };

    let confArgv = process.argv;

    let confData = Object.assign({}, configFileData, confExtraData, confEnv, confArgv);


    this.instance = {

        get : function (key) {
            return dotProp.get(confData, key);
        },

        set : function (key, val) {
            const config = confData;
    
            if (arguments.length === 1) {
                for (const k of Object.keys(key)) {
                    dotProp.set(config, k, key[k]);
                }
            } else {
                dotProp.set(config, key, val);
            }
    
            confData = config;
        },

        has : function (key) {
            return dotProp.has(confData, key);
        },

        delete: function (key) {
            const config = confData;
            dotProp.delete(config, key);
            confData = config;
        },

        clear : function () {
            confData = {};
        }

    }

    return this.instance;

});


module.exports = loader;
