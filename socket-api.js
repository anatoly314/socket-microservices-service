const config = require("./config");
const spaceport = require("./logic/spaceport");
const errorHandler = require("./error-handler");
const socket = require('socket.io-client')(config.ORCHESTRATOR.URL, {
    query: {
        type: config.CLIENT.TYPE,
        name: config.CLIENT.NAME
    }
});

let socketApi = {};

function _sendResponse(response){
    socket.emit("serviceResponse", response);
}

socket.on('connect', function(){
    console.log("connected");
});

socket.on(config.LISTEN_TO_EVENTS.LAUNCH_SHIP, function(data){
    console.log("LAUNCH_SHIP", data);
    spaceport.launchShip(data).then(_sendResponse, errorHandler.processError);
});

socket.on('disconnect', function(){
    console.log("disconnected");
});

module.exports = socketApi;