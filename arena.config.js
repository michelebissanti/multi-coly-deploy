"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
const MyRoom_1 = require("./rooms/MyRoom");
exports.default = arena_1.default({
    /* initializeTransport: () => {
        return new WebSocketTransport({
            server: new HTTPSServer(),
        })
    }, */
    getId: () => "BabylonJS and Colyseus Demo Server",
    initializeGameServer: (gameServer) => {
        gameServer.define('my_room', MyRoom_1.MyRoom);
        /* gameServer = new Server({
            transport: new uWebSocketsTransport({

            })
        }) */
    },
    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("Server ready!");
        });
        app.use("/colyseus", monitor_1.monitor());
    },
    beforeListen: () => {
    }
});
