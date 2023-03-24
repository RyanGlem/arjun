import { Circle } from "./circle";
import { Line } from "./line";
import { Polygon } from "./polygon";
import { Ray, Point } from "./ray";
import { distance, checkLineCollision } from "./linear_operations";
import { Particles } from "./particles";
import { Reflectors } from "./reflectors";
import { LightRay } from "./directional_light";
import { PointerLightRay } from "./pointer_light";

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
const particles: Particles[] = [];

for (let i = 0; i < 12; i++) {
  particles.push(new Particles(ctx, circlePointer));
}
let pLight = new PointerLightRay (ctx, {x: 500, y: 450})
let dLight = new PointerLightRay(ctx, circlePointer);
let mousePointer: Point = { x: 0, y: 0 };
//const trace = new Line(ctx, circlePointer, mousePointer, "red");
//const ray = new Ray(circlePointer, mousePointer);
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
    for (let ray of dLight.initialRays) {
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
      dLight.updatePosition({x:posX, y:posY}, translate);
    }
  };

  canvas.addEventListener("mousemove", move);
  canvas.onmouseup = () => {
    canvas.removeEventListener("mousemove", move);
    canvas.onmouseup = null;
  };
};

const draw = () => {
  //trace.update();
  dLight.update();
  pLight.update()
  circle.update();
  for (let polygon of polygons) {
    polygon.update();
  }
};

const findClosest = (walls: Line[], ray: Ray) => {
  let closest = null;
  let max = Number.MAX_VALUE;
  for (let wall of walls) {
    let hit = checkLineCollision(ray, wall);
    if (hit) {
      const dist = distance(ray.p1, hit);
      if (dist < max) {
        max = dist;
        closest = hit;
      }
    }
  }
  return closest;
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

const update = (timestamp: DOMHighResTimeStamp) => {
  /*if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;
  let time = elapsed * 0.001;*/
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dLight.lookAt(circlePointer, {x:0, y:0})
  dLight.calcIntersects(polygons, circlePointer);
  dLight.lookAt({x: 80, y: 140}, {x:500, y:300})
  dLight.calcIntersects(polygons, {x:80, y :140});
  displayFPS();

  /*particles[0].calcIntersects(
    polygons,
    { x: circlePointer.x, y: circlePointer.y },
    20,
    "rgba(232,232,254,0.5)"
  );
  
  particles[1].calcIntersects(
    polygons,
    { x: circlePointer.x + 9.5, y: circlePointer.y + 9 },
    20,
    "rgba(232,232,254,0.43)"
  );
  particles[2].calcIntersects(
    polygons,
    { x: circlePointer.x - 9, y: circlePointer.y - 9.5 },
    15,
    "rgba(232,232,254,0.33)"
  );*/
  draw();

  requestAnimationFrame(update);
};

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
  circlePointer = { x: circle.x, y: circle.y };
  mousePointer = { x: mouseX, y: mouseY };
  //ray.p1 = circlePointer;
  //ray.p2 = mousePointer;
});

canvas.addEventListener("mousedown", drag);

requestAnimationFrame(update);
