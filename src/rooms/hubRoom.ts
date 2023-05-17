import { Room, Client } from "colyseus";
import { State, Player, InputKeys } from "./hubState";

export default class HubRoom extends Room<State> {
  fixedTimeStep = 1000 / 60;

  onCreate() {
    this.setState(new State());
    this.setPatchRate(16.6);

    this.onMessage("move", (client, input) => {
      let player = this.state.players.get(client.sessionId);

      if (player) player.inputQueue.push(input);
    });

    this.setSimulationInterval((deltaTime) => {
      this.update(deltaTime)
    });
  }

  update(deltaTime: number) {
    const velocity = 1;

    this.state.players.forEach((player) => {
      let input: InputKeys;

      // dequeue player inputs
      while ((input = player.inputQueue.shift() as InputKeys)) {
        if (input.w.pressed) {
          player.y -= velocity;
        }

        if (input.s.pressed) {
          player.y += velocity;
        }

        if (input.a.pressed) {
          player.x -= velocity;
        }

        if (input.d.pressed) {
          player.x += velocity;
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
