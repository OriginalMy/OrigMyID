const express = require('express');
const ControllerResgister = require('../controller/ControllersRegister');
const Router = express.Router;

module.exports = class AppRouter {

    constructor(config) {
        this.config = config || {};
        this.router = new Router();
    }

    build() {
        for (const route in this.config) {
            if (this.config.hasOwnProperty(route)) {
                let httpMethods = this.config[route];

                for (const method in httpMethods) {
                    if (httpMethods.hasOwnProperty(method)) {
                        let controllerData = httpMethods[method];

                        let controller = controllerData['controller'] || null;

                        let action = controllerData['action'] || 'get';

                        let handlerFunc = (req, res, next) => {
                            let obj = new ControllerResgister[controller]();
                            return obj[action](req, res, next);
                        };

                        this.router.get(route, handlerFunc);
                    }
                }
            }
        }

        return this.router;
    }
}