let Sequelize = require('sequelize');
let ConfigLoader = require('../../../config_loader/loader')();

let databaseCfg = ConfigLoader.get('DATABASE');

var Connection = new Sequelize({
        dialect : "mysql",

        replication: {
            write: databaseCfg.MASTER,
            read:  databaseCfg.SLAVES            
        }
    });


module.exports = Connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    social_id_facebook: {
        type: Sequelize.STRING,
        allowNull: true
    },
    social_id_google: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatar_path: {
        type: Sequelize.STRING,
        allowNull: true
    },
    flg_status: {
        type: Sequelize.ENUM,
        values: ['ACTIVE', 'INACTIVE'],
        defaultValue: 'ACTIVE',
        allowNull: false
    },
    flg_register_status: {
        type: Sequelize.ENUM,
        values: ['LEAD', 'KYC', 'FINISHED'],
        defaultValue: 'LEAD',
        allowNull: false
    },
    dt_birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},{
    timestamps: true,
    createdAt: 'dt_insert',
    updatedAt: 'dt_update',
    freezeTableName: true,
});
