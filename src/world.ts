import { Circle } from "./circle";
import { Line } from "./line";
import { Ship } from "./ship";
import { Polygon } from "./polygon";
import { Ray, Point } from "./ray";
import { PointLight } from "./lights/point_light";
import { DirectLight } from "./lights/directional_light";
import { Rectangle } from "./camera";

const canvas: HTMLCanvasElement = document.getElementById(
  "container"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let camera = new Rectangle({ x: 0, y: 0 }, canvas.width, canvas.height);

let getRandX = () => {
  return Math.floor(Math.random() * canvas.width);
};

let getRandY = () => {
  return Math.floor(Math.random() * canvas.height);
};

const archer = new Ship (ctx, undefined, {x: 120, y: 330}, 3, 12, "red")
let polygons = [
  new Ship (ctx, undefined, {x: 121, y: 330}, 3, 12, "magenta"),
  new Ship (ctx, undefined, {x: 122, y: 330}, 3, 12, "yellow"),
  new Ship (ctx, undefined, {x: 123, y: 330}, 3, 12, "blue"),
  new Ship (ctx, undefined, {x: 124, y: 330}, 3, 12, "green"),
  new Ship (ctx, undefined, {x: 125, y: 330}, 3, 12, "orange"),
  new Polygon(ctx, 3, { x: 300, y: 400 }, 40),
  new Polygon(ctx, 4, { x: 700, y: 100 }, 60),
  new Polygon(ctx, 5, { x: 800, y: 600 }, 80),
  new Polygon(ctx, 3, { x: canvas.width / 2, y: canvas.height / 2 }, 100),
  new Polygon(ctx, 5, { x: 100, y: 650 }, 100),
  new Polygon(ctx, 7, { x: 1300, y: 300 }, 80),
  new Polygon(ctx, 4, { x: 110, y: 150 }, 100),
  new Polygon(ctx, 4, { x: 900, y: 500 }, 200),
  new Polygon(ctx, 5, { x: 2000, y: 500 }, 200),
  new Line(ctx, { x: 0, y: 0 }, { x: canvas.width, y: 0 }, "black"),
  new Line(ctx, { x: 0, y: 0 }, { x: 0, y: canvas.height }, "black"),
  new Line(
    ctx,
    { x: 0, y: canvas.height },
    { x: canvas.width, y: canvas.height },
    "black"
  ),
  new Line(
    ctx,
    { x: canvas.width, y: 0 },
    { x: canvas.width, y: canvas.height },
    "black"
  ),
];
const ship = new Ship (ctx, polygons, { x: canvas.width / 2, y: canvas.height / 2 }, 3, 50, undefined, true)
const circle = new Circle(ctx, 15, canvas.width / 2, canvas.height / 2, "gray");
const Collections: any[] = [];
polygons.push(archer)
Collections.push(...polygons);
Collections.push(circle);

let circlePointer: Point = { x: circle.x, y: circle.y };

// Lights
const pointLight = new PointLight(ctx, polygons, circlePointer);
const directLight = new DirectLight(ctx, polygons, circlePointer, -30, 30);
let mousePointer: Point = { x: 0, y: 0 };
//const reflectors = new Reflectors(ctx, ray);

const checkHit = (scanRay: Ray) => {
  for (let entity of Collections) {
    let hit = entity.checkInside(scanRay);

    if (hit) return entity;
  }
};

const drag = (event: MouseEvent) => {
  let scanRay = new Ray(
    {
      x: event.offsetX - camera.topLeftPos.x,
      y: event.offsetY - camera.topLeftPos.y,
    },
    {
      x: event.offsetX + 10 - camera.topLeftPos.x,
      y: event.offsetY - camera.topLeftPos.y,
    }
  );

  let initialPoint = { x: event.offsetX, y: event.offsetY };
  let initialPosition: Point;
  let initialCirclePosition: Point;
  scanRay.rayExtension();

  let initialEntity = checkHit(scanRay);
  let initialPositions: Point[] = [];

  if (initialEntity && initialEntity instanceof Polygon) {
    for (let vertex of initialEntity.vertices) {
      initialPosition = {
        x: initialPoint.x - vertex.x,
        y: initialPoint.y - vertex.y,
      };
      initialPositions.push(initialPosition);
    }
  } else if (initialEntity instanceof Circle) {
    initialCirclePosition = {
      x: initialPoint.x - initialEntity.x,
      y: initialPoint.y - initialEntity.y,
    };
  }

  const move = (event: MouseEvent) => {
    let offsetX = event.offsetX;
    let offsetY = event.offsetY;
    let translate: Point[] = [];

    if (initialEntity && initialEntity instanceof Polygon) {
      for (let position of initialPositions) {
        translate.push({ x: offsetX - position.x, y: offsetY - position.y });
      }

      initialEntity.updatePosition(translate);
    } else if (initialEntity instanceof Circle) {
      let posX = offsetX - initialCirclePosition.x;
      let posY = offsetY - initialCirclePosition.y;
      initialEntity.updatePosition(posX, posY);
    }
  };

  canvas.addEventListener("mousemove", move);
  canvas.onmouseup = () => {
    canvas.removeEventListener("mousemove", move);
    canvas.onmouseup = null;
  };
};

const draw = () => {
  ship.update()
  for (let polygon of polygons) {
    polygon.update();
  }
  circle.update(); 
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

//let ship = polygons[0] as Ship;

let start: number;
let deltaTime: number = 0.001;

// The update method is called when the browswer is ready for a repaint to redraw the screen
const update = (timestamp: DOMHighResTimeStamp) => {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  // This is the time it takes to call every loop which is about 6 MS
  //elapsedSinceLastLoop = timestamp - lastTime // 6 MS between each frame
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let mouseCamOffset = {x:mousePointer.x - camera.topLeftPos.x, y:mousePointer.y - camera.topLeftPos.y}

  displayFPS();

  ship.move(keys);
  ship.lookAt(mouseCamOffset)

  ship.updateSimulation(deltaTime, camera.topLeftPos);
  ship.translateCamera(camera);
  ctx.translate(camera.topLeftPos.x, camera.topLeftPos.y);
  for (let poly of polygons) {
    if (poly instanceof Ship) {
      poly.updateSimulation (deltaTime, camera.topLeftPos)
      poly.speed = 10
      poly.lookAt (mouseCamOffset)
    }
  }
  ship.drawShipLight(polygons)
  draw();
  requestAnimationFrame(update);
};

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
  circlePointer = { x: circle.x, y: circle.y };
  mousePointer = { x: mouseX, y: mouseY };
});

const keys = {
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

canvas.addEventListener("mousedown", drag);

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
