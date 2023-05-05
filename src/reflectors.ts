import { Ray, Point } from "./ray";
import { distance, checkLineCollision } from "./linear_operations";
import { Polygon } from "./polygon";

const MAX_RAYS = 10;

export class Reflectors {
  starter: Ray;
  strokeColor = "red"
  reflectorRays : Ray[] = []
  ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    starter = new Ray(
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ),
    strokeColor = "red"
  ) {
    this.ctx = ctx;
    this.starter = starter;
    this.strokeColor = strokeColor;
  }

  // Calculates the number of possible hits for reflections
  calculateHits(walls: Ray[], ray?: Ray) {
    ray = ray === undefined ? new Ray() : ray;
    let starterRay = ray
    let reflectorRay = new Ray();
    
    //this.getSceneWalls(walls)
    let hit = this.findClosest(walls, this.starter);
    let prevHit = hit;
    let nextHit = null;
    let rays: Ray[] = [];

    // This is the first hit for the starting ray of the reflectors
    if (hit[0] && hit[1]) {
      for (let i = 0; i < MAX_RAYS - 1; i++) {
        let closestHit = prevHit[0] as Point;
        let closestWall = prevHit[1] as Ray;

        if (closestHit) {
          if (rays.length === 0) {
            starterRay.p2 = closestHit;
            rays.push(starterRay);
          } else {
            starterRay = new Ray(rays[i - 1].p2, closestHit);
            rays.push(starterRay);
          }

          let rPoints = this.findReflection(
            closestWall,
            rays[i],
            closestHit.x,
            closestHit.y
          );

          reflectorRay = new Ray(closestHit, rPoints);
          reflectorRay.rayExtension()
        }
        nextHit = this.findClosest(walls, reflectorRay);
        prevHit = nextHit;
      }
      rays.push (reflectorRay)
    } else if (rays.length === 0) {
      rays.push(this.starter)
    }
    this.reflectorRays = rays
    this.drawReflections(rays);
  }

  private drawReflections(rays: Ray[]) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.strokeColor
    let start = rays[0].p1
    let end = rays[0].p2
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(end.x, end.y)
    for (let i = 1; i < rays.length; i++) {
      start = rays[i].p1
      end = rays[i].p2
      this.ctx.moveTo(start.x, start.y)
      this.ctx.lineTo(end.x, end.y)
    }

    this.ctx.closePath()
    this.ctx.stroke()
  }

  findClosest (walls: Ray[], ray: Ray) {
    let closest = null;
    let closestWall = null;
    let max = Number.MAX_VALUE;
    for (let wall of walls) {
      let hit = checkLineCollision(ray, wall);
      if (hit) {
        const dist = distance(ray.p1, hit);
        if (dist < max && dist !== 0) {
          max = dist;
          closest = hit;
          closestWall = wall;
        }
      }
    }

    return [closest, closestWall];
  };

  findReflection = (line: Ray, ray: Ray, iX: number, iY: number) => {
    let normal = line.normalize();

    let rayX = ray.p1.x - iX;
    let rayY = ray.p1.y - iY;
    let dotProduct = rayX * normal.x + rayY * normal.y;

    let dotNormalX = dotProduct * normal.x;
    let dotNormalY = dotProduct * normal.y;

    let reflectedRayX = ray.p1.x - dotNormalX * 2;
    let reflectedRayY = ray.p1.y - dotNormalY * 2;

    return { x: reflectedRayX, y: reflectedRayY };
  };
}
