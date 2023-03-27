import { Circle } from "./circle";
import { Line } from "./line";
import { Polygon } from "./polygon";
import { Ray, Point } from "./ray";
import { PointLight } from "./lights/point_light";
import { DirectLight } from "./lights/directional_light";
import { TrackLight } from "./lights/tracking_light";

const canvas: HTMLCanvasElement = document.getElementById(
  "container"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

let start: number;
let getRandX = () => {
  return Math.floor(Math.random() * canvas.width);
};

let getRandY = () => {
  return Math.floor(Math.random() * canvas.height);
};

let polygons = [
  new Polygon(ctx, 3, { x: 300, y: 400 }, 40),
  new Polygon(ctx, 4, { x: 700, y: 100 }, 60),
  new Polygon(ctx, 5, { x: 800, y: 600 }, 80),
  new Polygon(ctx, 3, { x: canvas.width / 2, y: canvas.height / 2 }, 100),
  new Polygon(ctx, 5, { x: 100, y: 650 }, 100),
  new Polygon(ctx, 7, { x: 1300, y: 300 }, 80),
  new Polygon(ctx, 4, { x: 110, y: 150 }, 100),
  new Polygon(ctx, 4, { x: 900, y: 500 }, 200),
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

const circle = new Circle(ctx, 15, canvas.width / 2, canvas.height / 2, "gray");
const Collections: any[] = [];
Collections.push(...polygons);
Collections.push(circle);

let circlePointer: Point = { x: circle.x, y: circle.y };

// Lights
const pointLight = new PointLight (ctx, polygons, circlePointer);
const directLight = new DirectLight (ctx, polygons, circlePointer, 0, 30)
const trackLight = new TrackLight (ctx, polygons, circlePointer, 0, 30);
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
    { x: event.offsetX, y: event.offsetY },
    { x: event.offsetX + 10, y: event.offsetY }
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
    for (let ray of trackLight.rays) {
      initialPosition = {
        x: initialPoint.x - ray.p2.x,
        y: initialPoint.y - ray.p2.y,
      };
      initialPositions.push(initialPosition);
    }
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
      for (let position of initialPositions) {
        translate.push({ x: offsetX - position.x, y: offsetY - position.y });
      }
      trackLight.updatePosition({x:posX, y:posY}, translate);
    }
  };

  canvas.addEventListener("mousemove", move);
  canvas.onmouseup = () => {
    canvas.removeEventListener("mousemove", move);
    canvas.onmouseup = null;
  };
};

const draw = () => {
  circle.update();
  for (let polygon of polygons) {
    polygon.update();
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

const update = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  displayFPS();
  trackLight.lookAt(polygons, circlePointer, mousePointer)
  //pointLight.updateRays(polygons, circlePointer)

  draw();
  requestAnimationFrame(update);
};

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
  circlePointer = { x: circle.x, y: circle.y };
  mousePointer = { x: mouseX, y: mouseY };
});

canvas.addEventListener("mousedown", drag);

requestAnimationFrame(update);
