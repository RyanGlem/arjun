import { Client, Room } from "colyseus.js";
import { RenderCircle } from "./circle";
import { Ship } from "./ship"
import { lerp } from "./linear_operations";
import type { State } from "../src/rooms/hubState";

const client = new Client("ws://localhost/80");

const canvas: HTMLCanvasElement = document.getElementById(
  "container"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let serverPositions : {[sessionId: string] : {x: number, y: number}} = {}

let players = new Map<string, RenderCircle>();
let room: Room<State>;

const create = async () => {
  await join();

  room.state.players.onAdd((player, sessionId) => {
    players.set(
      sessionId,
      new RenderCircle(ctx, 15, player.x, player.y, "cyan")
    );

    if (sessionId !== room.sessionId) {
      player.onChange(() => {
        serverPositions[sessionId] = {x:player.x, y:player.y}
      });
    }
  });
};

const join = async () => {
  room = await client.joinOrCreate<State>("hub");
  console.log("joined successfully", room.id);
};

try {
  create();
} catch (e) {
  console.error("create error", e);
}

let keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const draw = () => {
  if (players.size != 0) {
    for (let player of players.values()) {
      player.update();
    }
  }
};

let frameTime = 0;
let lastLoop = performance.now();
const displayFPS = () => {
  let thisLoop = performance.now();
  let thisFrameTime = thisLoop - lastLoop;
  frameTime += (thisFrameTime - frameTime) / 100;
  lastLoop = thisLoop;
  let frames = (1000 / frameTime).toFixed(0) + " FPS";
  ctx.fillStyle = "cyan";
  ctx.font = "normal 28px Arial";
  ctx.fillText(frames, canvas.width - 140, 40);
};

let start: number;
let deltaTime: number = 0.001;

const update = (timestamp: DOMHighResTimeStamp) => {
  if (!start) start = timestamp;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (room) {
    let clientPlayer = players.get(room.sessionId) as RenderCircle;

    room.send("move", keys);
    const velocity = 1;
    if (clientPlayer) {
      if (keys.w.pressed)
        clientPlayer.updatePosition(
          clientPlayer.circle.x,
          (clientPlayer.circle.y -= velocity)
        );

      if (keys.s.pressed)
        clientPlayer.updatePosition(
          clientPlayer.circle.x,
          (clientPlayer.circle.y += velocity)
        );

      if (keys.a.pressed)
        clientPlayer.updatePosition(
          (clientPlayer.circle.x -= velocity),
          clientPlayer.circle.y
        );

      if (keys.d.pressed)
        clientPlayer.updatePosition(
          (clientPlayer.circle.x += velocity),
          clientPlayer.circle.y
        );
    }

    for (let sessionId of players.keys()) {
      if (sessionId === room.sessionId) {
        continue;
      }

      const player = players.get(sessionId) as RenderCircle;
      const serverPlayer = room.state.players.get(sessionId);

      const lerpPos = lerp (player.circle.center, serverPositions[sessionId], 0.2)

      if (serverPlayer) {
        player.updatePosition(lerpPos.x, lerpPos.y)
      }
    }
  }

  displayFPS();
  draw();
  requestAnimationFrame(update);
};

window.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event: KeyboardEvent) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

requestAnimationFrame(update);
