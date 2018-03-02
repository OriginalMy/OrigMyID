const  error = require('util');

const fs = require('fs');
const path = require('path');
const APP_PATH = fs.realpathSync(`${__dirname}/../`);
const CFG_PATH = path.join(APP_PATH,'config');
const SRC_PATH = path.join(APP_PATH,'src');
const LOG_PATH = path.join(APP_PATH,'logs');

const NODE_ENV = (process.env.NODE_ENV || 'prod').toLowerCase();

let configFilePath = path.join(CFG_PATH, 'environment', `${NODE_ENV}.json`);
let loaderPath = path.join(SRC_PATH, 'config_loader', 'loader');

const ConfigLoader = require( loaderPath )( configFilePath ,{
    "APP_PATH" : APP_PATH,
    "CFG_PATH" : CFG_PATH,
    "SRC_PATH" : SRC_PATH,
    "LOG_PATH" : LOG_PATH
});

const HOST = ConfigLoader.get('HOST');
const PORT = ConfigLoader.get('PORT');
const debug = require('debug')('nodestr:server');
const http = require('http');
const express = require('express');
const app = require('../src/api/App');


app.set('port', normalizePort(PORT));
app.set('domain', HOST);

const server = http.createServer(app);

server.listen(PORT, HOST);
server.on('error', onError);
server.on('listening', onListening);

app.set("view engine", "ejs");
app.set("views", "./src/views")
app.use(express.static("public"));

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}



function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'pipe ' + addr.port;

    debug('litening on' + bind);
}

console.log(`Server runnig(${NODE_ENV}) Pid(${process.pid}) : http://${HOST}:${PORT}`);