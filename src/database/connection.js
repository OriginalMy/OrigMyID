let Sequelize = require('sequelize');
let ConfigLoader = require('../config_loader/loader')();

module.exports.Connection = (function () {

    if(this.instance){
        return this.instance;
    }

    this.instance = null;

    let databaseCfg = ConfigLoader.get('DATABASE');

    console.log(databaseCfg);

    // this.instance = new Sequelize({
    //     replication: {
    //         write: databaseCfg.MASTER,
    //         read:  databaseCfg.SLAVES            
    //     }
    // });

    // this.instance.authenticate().then(() => {
    //         console.log('Connection has been established successfully.');
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect to the database:', err);
    //     });

    return this.instance;

});