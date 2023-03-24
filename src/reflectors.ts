import { Line } from "./line";
import { Ray, Point } from "./ray";
import { distance, checkLineCollision } from "./linear_operations";

const MAX_RAYS = 10;

export class Reflectors {
  rays: Line[] = [];
  ctx: CanvasRenderingContext2D;
  starter: Ray;

  constructor(
    ctx: CanvasRenderingContext2D,
    starter = new Ray(
      { x: 0, y: 0 },
      { x: ctx.canvas.width, y: ctx.canvas.height },
    )
  ) {
    this.ctx = ctx;
    let p1: Point = { x: 0, y: 0 };
    let p2: Point = { x: 0, y: 0 };

    this.starter = starter;

    for (let i = 0; i < MAX_RAYS; i++) {
      this.rays[i] = new Line(ctx, p1, p2, "red");
    }
    this.update();
  }

  update() {
    for (let ray of this.rays) {
      ray.update();
    }
  }

  // Calculates the number of possible hits for reflections
  calculateHits(walls: Line[], ray?: Ray) {
    ray = ray === undefined ? this.rays[0] : ray;
    let starterRay = new Ray(ray.p1, ray.p2);
    let reflectorRay = new Ray();

    let hit = this.findClosest(walls, starterRay);
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
    }
    this.drawReflections(rays);
  }

  private drawReflections(rays: Ray[]) {
    this.freeReflectors()
    for (let i = 1; i < rays.length; i++) {
      this.rays[i].p1 = rays[i].p1;
      this.rays[i].p2 = rays[i].p2;
    }
  }

  freeReflectors = () => {
    for (let i = 0; i < MAX_RAYS; i++) {
      let pt: Point = { x: 0, y: 0 };
      this.rays[i].p1 = pt;
      this.rays[i].p2 = pt;
    }
  };

  findClosest = (walls: Line[], ray: Ray) => {
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
