import { Ray, Point } from "./ray";
import { Line } from "./line";
import { Polygon } from "./polygon";
import {
  checkLineCollision,
  distance,
  angleBetween,
  toDeg,
  toRad,
} from "./linear_operations";

const MAX_ANGLE = 55
export class PointerLightRay {
  rays: Ray[] = [];
  initialRays: Ray[] = []
  lines: Line[] = [];
  ctx: CanvasRenderingContext2D;
  position: Point = { x: 0, y: 0 };

  constructor(ctx: CanvasRenderingContext2D, position: Point = { x: 0, y: 0 }) {
    this.ctx = ctx;
    this.position = position;
    this.createRays();
    this.update();
  }

  draw() {
    //this.lines = []
    for (let line of this.lines) {
      line.update();
    }
  }

  lookAt(startPointer: Point, mouse: Point) {

    let pointerRay = new Ray(startPointer, mouse);

    let rayPos = [];
    this.rays = []

    // x^1 = x Math.cos (theta) - y Math.sin (theta)
    // y^1 = y Math.cos (theta) + x Math.sin (theta)
    /*for (let i = 0; i < this.initialRays.length; i++) {
        this.initialRays[i].p1 = startPointer
    }*/

    let offset = MAX_ANGLE/2;
    for (let ray of this.initialRays) {
      if (ray) {
        let angle = toDeg(pointerRay.getAngle());
        let pos = { x: ray.p2.x - ray.p1.x, y: ray.p2.y - ray.p1.y };
        let xPrime =
          pos.x * Math.cos(toRad(angle - offset)) -
          pos.y * Math.sin(toRad(angle - offset));
        let yPrime =
          pos.y * Math.cos(toRad(angle - offset)) +
          pos.x * Math.sin(toRad(angle - offset));
        rayPos.push({ x: xPrime + ray.p1.x, y: yPrime + ray.p1.y });
      }
    }

    for (let i = 0; i < rayPos.length; i++) {
      if (rayPos[i]) {
        let extender = new Ray(startPointer, rayPos[i]);
        this.rays.push (extender)
        /*this.ctx.beginPath();
        this.ctx.moveTo(extender.p1.x, extender.p1.y);
        this.ctx.lineTo(extender.p2.x, extender.p2.y);
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();
        this.ctx.closePath();*/
      }
    }
  }

  createRays() {
    for (let angle = 0; angle <= MAX_ANGLE; angle += 0.1) {
      let radians = (angle * Math.PI) / 180;
      let posX = Math.cos(radians) + this.position.x;
      let posY = Math.sin(radians) + this.position.y;
      let ray = new Ray(this.position, {
        x: posX,
        y: posY,
      });
      ray.rayExtension();
      this.initialRays.push(ray);
    }
  }

  updatePosition(sourcePoint: Point, point: Point[]) {
    for (let i = 0; i < this.initialRays.length; i++) {
      this.initialRays[i].p1 = sourcePoint;
      this.initialRays[i].p2 = point[i];
    }
  }

  update() {
    //this.ctx.strokeStyle = "white";
    this.draw();
    this.ctx.stroke();
  }

  calcIntersects = (walls: (Ray | Polygon)[], pointer: Point) => {
    this.lines = [];

    let transforms: Ray[] = [];
    for (let wall of walls) {
      if (wall instanceof Polygon) {
        let rays = wall.getLines();
        transforms.push(...rays);
      } else {
        transforms.push(wall);
      }
    }

    let intersects = this.findClosest(transforms);
    for (let intersect of intersects) {
      let line = new Line(this.ctx, pointer, intersect, "rgba(232,232,254,0)");
      this.lines.push(line);
    }

    this.drawSightPolygon("rgba(232,232,254,0.5)")
  };

  drawSightPolygon(color: string) {
    let angles = [];
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = 3
    this.ctx.strokeStyle = "rgba(232,232,254,1)";

    for (let line of this.lines) {
      angles.push({ line: line, angle: line.getAngle() });
    }


    this.ctx.beginPath();
    this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
    for (let i = 1; i < angles.length; i++) {
      this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
    }
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.lineTo(
      angles[angles.length - 1].line.p2.x,
      angles[angles.length - 1].line.p2.y
    )
    this.ctx.lineTo(
      angles[angles.length - 1].line.p1.x,
      angles[angles.length - 1].line.p1.y
    );

    
    this.ctx.fill();
    this.ctx.closePath();
  }

  findClosest = (walls: Ray[]) => {
    let intersects = [];
    for (let ray of this.rays) {
      let closest = null;
      let max = Number.MAX_VALUE;
      for (let wall of walls) {
        let hit = checkLineCollision(ray, wall);
        if (hit) {
          const dist = distance(ray.p1, hit);
          if (dist < max && dist !== 0) {
            max = dist;
            closest = hit;
          }
        }
      }

      if (closest) {
        intersects.push(closest);
      }
    }

    return intersects;
  };
}
