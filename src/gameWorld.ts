import { Client, Room } from "colyseus.js";
import { Point } from "./ray";
import { Ship } from "./ship";
import {
  calculateVelocity,
  lerp,
  rotatePoints,
  toDeg,
} from "./linear_operations";
import type { State } from "../src/rooms/hubState";
import { Rectangle } from "./camera";

const client = new Client("ws://localhost/80");

const canvas: HTMLCanvasElement = document.getElementById(
  "container"
) as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let camera = new Rectangle({ x: 0, y: 0 }, canvas.width, canvas.height);
let mousePointer: Point = { x: 0, y: 0 };
let players = new Map<string, Ship>();
let room: Room<State>;
let serverEntity: {
  [sessionId: string]: {
    x: number;
    y: number;
    position: Point;
    vertices: Point[];
    speed: number;
    angle: number;
    velocity: Point;
  };
} = {};

const create = async () => {
  await join();

  room.state.players.onAdd((player, sessionId) => {
    players.set(
      sessionId,
      new Ship(
        ctx,
        false,
        player.position,
        1,
        3,
        10,
        "cyan",
        true,
        player.ship.vertices,
        player.angle,
      )
    );
    if (sessionId !== room.sessionId) {
      player.onChange(() => {
        serverEntity[sessionId] = {
          x: player.x,
          y: player.y,
          position: player.position,
          vertices: player.ship.vertices,
          speed: player.ship.speed,
          velocity: player.ship.velocity,
          angle: player.angle,
        };
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
  if (players.size !== 0) {
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

  return thisFrameTime;
};

let start: number;
let oldTimeStamp: number;
let deltaTime: number;
const update = (timestamp: DOMHighResTimeStamp) => {
  if (!start) start = timestamp;

  let secondsPassed = (timestamp - oldTimeStamp) / 1000;
  oldTimeStamp = timestamp;
  if (secondsPassed) deltaTime = secondsPassed;
  if (deltaTime) deltaTime = Number((deltaTime).toFixed(3))

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (room) {
    let clientPlayer = players.get(room.sessionId) as Ship;

    let mouseCamOffset = {
      x: mousePointer.x - camera.topLeftPos.x,
      y: mousePointer.y - camera.topLeftPos.y,
    };

    room.send("move", keys);
    room.send("mousePosition", mouseCamOffset);

    if (clientPlayer) {

      clientPlayer.move(keys);
      clientPlayer.updateSimulation(deltaTime, camera.topLeftPos);
      clientPlayer.lookAt(mouseCamOffset);
      clientPlayer.translateCamera(deltaTime, camera);
      ctx.translate(camera.topLeftPos.x, camera.topLeftPos.y)
    }

    for (let sessionId of players.keys()) {
      if (sessionId === room.sessionId) {
        break;
      }

      const player = players.get(sessionId) as Ship;
      const serverPlayer = serverEntity[sessionId];
      const rotPos = rotatePoints(
        serverPlayer.vertices,
        serverPlayer.angle,
        serverPlayer.position
      );
      let lerpArray = [];
      for (let i = 0; i < player.vertices.length; i++) {
        let playerPos = player.vertices[i];
        let serverPos = rotPos[i];
        if (serverPos) {
          lerpArray.push(lerp(playerPos, serverPos, 0.2));
        }
      }

      if (lerpArray.length !== 0) {
        player.vertices = lerpArray;
      }
    }
  }

  displayFPS();
  draw();
  requestAnimationFrame(update);
};

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
  mousePointer = { x: mouseX, y: mouseY };
});

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
