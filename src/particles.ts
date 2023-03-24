import { Line } from "./line";
import { Polygon } from "./polygon";
import { checkLineCollision, distance } from "./linear_operations";
import { Point, Ray } from "./ray";

export class Particles {
  ctx: CanvasRenderingContext2D;
  rays: Ray[] = [];
  lines: Line[] = [];
  angles: number[] = [];
  center: Point;

  constructor(ctx: CanvasRenderingContext2D, center = { x: 0, y: 0 }) {
    this.ctx = ctx;
    this.center = center;

    this.update();
  }

  update() {
    for (let line of this.lines) {
      line.update();
    }
  }

  calcIntersects(
    walls: (Ray | Polygon)[],
    pointer: Point = { x: 0, y: 0 },
    radius: number = 15,
    color:string
  ) {
    let transforms : Ray[] = []
    for (let wall of walls) {
      if (wall instanceof Polygon) {
        let rays = wall.getLines()
        transforms.push(...rays)
      } else {
        transforms.push(wall)
      }
    }
    let uPoints = this.getUniquePoints(transforms);
    this.lines = [];
    this.rays = [];
    for (let i = 0; i < uPoints.length; i++) {
      let pos = uPoints[i];
      let ray = new Ray(pointer, pos);

      let magnitude = ray.distance();
      let angle = ray.getAngle();

      let leftRayEnd = {
        x: magnitude * Math.cos(angle - 0.00001) + pointer.x,
        y: magnitude * Math.sin(angle - 0.00001) + pointer.y,
      };

      let rightRayEnd = {
        x: magnitude * Math.cos(angle + 0.00001) + pointer.x,
        y: magnitude * Math.sin(angle + 0.00001) + pointer.y,
      };
      
      let rightRay = new Ray(pointer, rightRayEnd);
      let leftRay = new Ray(pointer, leftRayEnd);
      leftRay.rayExtension();
      rightRay.rayExtension();
      this.rays.push(leftRay, ray, rightRay);
    }

    //Adding rays in 360 degress to smooth out light on edges
    for (let angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / 40) {
      let posX = Math.cos(angle) * radius;
      let posY = Math.sin(angle) * radius; 

      let spanRay = new Ray(pointer, {
        x: posX + pointer.x,
        y: posY + pointer.y,
      });
      spanRay.rayExtension();
      this.rays.push(spanRay);
    }

    let intersects = this.findClosest(transforms);
    for (let intersect of intersects) {
      let line = new Line(this.ctx, pointer, intersect, "rgba(0,0,0,0)");
      this.lines.push(line);
    }
    this.drawSightPolygon(color)
  }

  drawSightPolygon(color : string) {
    let angles = [];
    this.ctx.fillStyle = color;

    for (let line of this.lines) {
      angles.push({ line: line, angle: line.getAngle() });
    }

    angles = angles.sort((a, b) => {
      return a.angle - b.angle;
    });

    this.ctx.beginPath();
    this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
    for (let i = 1; i < angles.length; i++) {
      this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      
    }

    this.ctx.fill();
    this.ctx.closePath();
  }

  // Need if light rays are static
  updateRays(pointer: Point, pos: Point[]) {
    for (let i = 0; i < pos.length; i++) {
      this.rays[i].p1 = pointer;
      this.rays[i].p2 = pos[i];
    }
  }

  getUniquePoints = (walls: Ray[]) => {
    let pts: Point[] = [];
    walls.forEach((wall) => {
      pts.push(wall.p1, wall.p2);
    });

    let set: any = {};
    const uniquePoints = pts.filter((p) => {
      let key = p.x + "," + p.y;
      if (key in set) {
        return false;
      } else {
        set[key] = true;
        return true;
      }
    });

    return uniquePoints;
  };

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
