const express = require('express');
const bodyParser  = require('body-parser');
const fs  = require('fs');
const path  = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const AppRouter = require('../router/AppRouter');
const configLoader = require('../config_loader/loader')();

class App {

    constructor()
    {
        this.appExpress = express();
        this.config();
        this.routes();
    }

    config(){

        /**
         * Access.Log Definition
         */
        let accessLogStream = fs.createWriteStream(
            path.join(configLoader.get('LOG_PATH'), 'access.log'), {flags: 'a'}
        )
        this.appExpress.use(logger("common", {
                stream: accessLogStream
            }
        ));


        this.appExpress.use(bodyParser.json());
        this.appExpress.use(bodyParser.urlencoded({
            extended: true
        }));

        this.appExpress.use(cookieParser(
            configLoader.get('DEFINIR_NOVO_SECRET_COOKIE')
        ));


    }

    routes()
    {
        let routesPath = path.join(configLoader.get('CFG_PATH'), 'routes.json');
        let routes = require(routesPath);
        
        let router = new AppRouter(routes).build();

        router.use(function (err, req, res, next) {
            console.error(err);
            res.status(500).send('Something broke!')
        });

        this.appExpress.use(router);

    }

    getExpress(){
        return this.appExpress;
    }
    

}

module.exports = new App().getExpress();