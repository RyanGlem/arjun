import { Ray, Point } from "../ray";
import { Polygon } from "../polygon";
import { checkLineCollision, distance, toRad } from "../linear_operations";

export class DirectLight {
  rays: Ray[] = [];
  sceneWalls: Ray[] = [];
  startAngle: number = 0;
  endAngle: number = 1;
  ctx: CanvasRenderingContext2D;
  lightColor: string = "cyan";
  position: Point = { x: 0, y: 0 };
  increment: number = 0.1

  constructor(
    ctx: CanvasRenderingContext2D,
    walls: (Ray | Polygon)[],
    position: Point = { x: 0, y: 0 },
    startAngle = 0,
    endAngle = 1,
    lightColor: string = "cyan",
    increment:number = 0.1
  ) {
    this.ctx = ctx;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.position = position;
    this.lightColor = lightColor
    this.increment = increment
    this.createRays(position);
    this.getSceneWalls(walls);
  }

  getSceneWalls(walls: (Ray | Polygon)[]) {
    let sceneWalls: Ray[] = [];
    for (let wall of walls) {
      if (wall instanceof Polygon) {
        let rays = wall.getLines();
        sceneWalls.push(...rays);
      } else {
        sceneWalls.push(wall);
      }
    }
    this.sceneWalls = sceneWalls;
  }

  updateWalls(walls: (Ray | Polygon)[]) {
    this.getSceneWalls(walls);
  }

  // Create rays between a starting angle and ending angle
  createRays(position: Point) {
    for (let angle = this.startAngle; angle <= this.endAngle; angle += this.increment) {
      let radians = toRad(angle);
      let posX = Math.cos(radians) + position.x;
      let posY = Math.sin(radians) + position.y;
      let ray = new Ray(position, {
        x: posX,
        y: posY,
      });
      ray.rayExtension();
      this.rays.push(ray);
    }
  }

  updatePosition(sourcePoint: Point, point: Point[]) {
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].p1 = sourcePoint;
      this.rays[i].p2 = point[i];
    }
  }

  calcIntersects(position?: Point, rays?: Ray[]) {
    position = position === undefined ? this.position : position;
    rays = rays === undefined ? this.rays : rays;
    
    let sightLines: Ray[] = [];

    let intersects = this.findClosest(this.sceneWalls, rays);
    for (let intersect of intersects) {
      let line = new Ray(position, intersect);
      sightLines.push(line);
    }
    this.drawSightPolygon(sightLines);
  }

  drawSightPolygon(lines: Ray[]) {
    let angles = [];
    this.ctx.fillStyle = this.lightColor;

    for (let line of lines) {
      angles.push({ line: line, angle: line.getAngle() });
    }

    this.ctx.beginPath();
    this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
    for (let i = 1; i < angles.length; i++) {
      this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
    }
    this.ctx.lineTo(
      angles[angles.length - 1].line.p2.x,
      angles[angles.length - 1].line.p2.y
    );
    this.ctx.lineTo(
      angles[angles.length - 1].line.p1.x,
      angles[angles.length - 1].line.p1.y
    );
    this.ctx.closePath();
    this.ctx.fill();
  }

  findClosest = (walls: Ray[], rays?: Ray[]) => {
    rays = rays === undefined ? this.rays : rays;
    let intersects = [];
    for (let ray of rays) {
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
