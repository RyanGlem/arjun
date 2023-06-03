import { Room, Client } from "colyseus";
import { State, Player, InputKeys, Vertex } from "./hubState";
import { getAngle, rotatePoints, toRad } from "../linear_operations";
import { Ray, Point } from "../ray";
import { calculateVelocity, getCenterPosition, serverAngle} from "./roomLogic";

export default class HubRoom extends Room<State> {

  onCreate() {
    this.setState(new State());
    this.setPatchRate(16.6);

    this.onMessage("move", (client, input) => {
      let player = this.state.players.get(client.sessionId);

      if (player) {
        player.inputQueue.push(input)
        player.position = getCenterPosition(player.ship.vertices)
      };
    });

    this.onMessage("mousePosition", (client, position) => {
      let player = this.state.players.get(client.sessionId)

      if (player) {
        player.angle = serverAngle (player.position, position)
      } 
    })

    this.setSimulationInterval((deltaTime) => {
      this.update(deltaTime);
    });
  }

  update(deltaTime: number) {
    let accel = 0.1
    
    this.state.players.forEach((player) => {
      let input: InputKeys;
      let velocity = calculateVelocity(player.ship.speed, player.angle, player.ship.velocity, player.ship.vertices, deltaTime / 1000, 1)
      player.ship.vertices.forEach((vertex) => {
        vertex.x += velocity.x 
        vertex.y += velocity.y
      })

      // dequeue player inputs
      while ((input = player.inputQueue.shift() as InputKeys)) {
        if (input.w.pressed) {
          if (player.ship.speed <= player.ship.maxSpeed) {
            player.ship.speed += accel
          }
        }

        if (input.s.pressed) {
          if (player.ship.speed >= -1) {
            player.ship.speed -= accel
          }
        }

        if (input.a.pressed) {
          player.ship.vertices.forEach((vertex) => {
            vertex.x -= accel
          })
        }

        if (input.d.pressed) {
          player.ship.vertices.forEach((vertex) => {
            vertex.x += accel
          })
        }
      }
    });
  }

  onJoin(client: Client) {
    this.state.players.set(client.sessionId, new Player());
    console.log(client.sessionId, "has joined");
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }
}
