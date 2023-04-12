import { Ray, Point } from "../ray";
import { Polygon } from "../polygon";
import { checkLineCollision, distance, toDeg, toRad, getAngle } from "../linear_operations";

export class DirectLight {
  endAngle = 1;
  startAngle = 0;
  increment = 0.1
  rayLength = 500
  rays: Ray[] = [];
  lightColor = "cyan"
  rotRays: Ray[] = [];
  sceneWalls: Ray[] = [];
  ctx: CanvasRenderingContext2D;
  position: Point = { x: 0, y: 0 };
  
  constructor(
    ctx: CanvasRenderingContext2D,
    walls: (Ray | Polygon)[],
    position: Point = { x: 0, y: 0 },
    startAngle = 0,
    endAngle = 1,
    lightColor: string = "cyan",
    increment = 0.1,
    rayLength = 500
  ) {
    this.ctx = ctx;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.position = position;
    this.lightColor = lightColor
    this.increment = increment
    this.rayLength = rayLength
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
      ray.rayExtension(this.rayLength);
      this.rays.push(ray);
    }
  }

  updatePosition(sourcePoint: Point) {
    this.position = sourcePoint
    for (let i = 0; i < this.rays.length; i++) {
      let distance = this.rays[i].distance()
      let normal = this.rays[i].normalize()

      let pos = 
      {
        x: sourcePoint.x + distance * normal.x, 
        y: sourcePoint.y + distance * normal.y
      }

      this.rays[i].p1 = sourcePoint;
      this.rays[i].p2 = pos;
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
      angles.push({ line: line, angle: line.getRayAngle()});
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
      } else {
        intersects.push(ray.p2)
      }
    }
    return intersects;
  };

  rotate(angle = 0) {
    this.rotRays = []

    for (let ray of this.rays) {
      if (ray) {
        let pos = { x: ray.p2.x - ray.p1.x, y: ray.p2.y - ray.p1.y};
        let xPrime =
          pos.x * Math.cos(toRad(angle)) -
          pos.y * Math.sin(toRad(angle));
        let yPrime =
          pos.y * Math.cos(toRad(angle)) +
          pos.x * Math.sin(toRad(angle));
        let rotationalRay = new Ray(ray.p1, { x: xPrime + ray.p1.x, y: yPrime + ray.p1.y })
        this.rotRays.push(rotationalRay);
      }
    }
    this.calcIntersects(this.position, this.rotRays)
  }

  lookAt (trackPoint : Point) {
    let trackAngle = getAngle(this.position, trackPoint)
    this.rotate(toDeg(trackAngle))
  }
}
