"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 5;
    }
    onCreate(options) {
        console.log("MyRoom created.");
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("updatePosition", (client, data) => {
            console.log("update received -> ");
            console.debug(JSON.stringify(data));
            const player = this.state.players.get(client.sessionId);
            player.x = data["x"];
            player.y = data['y'];
            player.z = data["z"];
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        // create Player instance
        const player = new MyRoomState_1.Player();
        // place Player at a random position in the floor
        const FLOOR_SIZE = 500;
        player.x = 0;
        player.y = 10;
        player.z = 0;
        // place player in the map of players by its sessionId
        // (client.sessionId is unique per connection!)
        this.state.players.set(client.sessionId, player);
        console.log("new player =>", player.toJSON());
    }
    onLeave(client, consented) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
