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

/** SERVICE EVENT LISTENERS **/
socket.on('connect', function(){
    console.log("connected");
});

socket.on('disconnect', function(){
    console.log("disconnected");
});

socket.on('error', function(error) {
    console.log("Error happened", error);
});
/** SERVICE EVENT LISTENERS END **/


/** PRIVATE METHODS **/
function _sendResponse(response){
    socket.emit("serviceResponse", response, function (responseData) {
        console.log('Callback called with data:', responseData);
    });
}
/** PRIVATE METHODS END **/

/** CUSTOM EVENT LISTENERS **/
socket.on(config.LISTEN_TO_EVENTS.LAUNCH_SHIP, function(data, callback){
    console.log("LAUNCH_SHIP", data);
    spaceport.launchShip(data).then(_sendResponse, errorHandler.processError);
    callback("Service received the data");
});
/** CUSTOM EVENT LISTENERS END **/



module.exports = socketApi;