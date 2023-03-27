import { Ray, Point } from "../ray";
import { Polygon } from "../polygon";
import { DirectLight } from "./directional_light";
import { toDeg, toRad } from "../linear_operations";

export class TrackLight extends DirectLight {
  rays : Ray[] = []
  constructor(
    ctx: CanvasRenderingContext2D,
    walls: (Ray | Polygon)[],
    position: Point = { x: 0, y: 0 },
    startAngle = 0,
    endAngle = 2
  ) {
    super(ctx, walls, position, startAngle, endAngle);
    this.ctx = ctx;
    this.position = position;
    this.createRays(position);
  }

  lookAt(walls: (Ray | Polygon)[], startPoint: Point, trackPoint: Point) {
    let pointerRay = new Ray(startPoint, trackPoint);
    
    let rayPos = [];
    let trackRays: Ray[] = [];

    let offset = this.endAngle / 2;
    for (let ray of this.rays) {
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
        let ray = new Ray(startPoint, rayPos[i]);
        trackRays.push(ray);
      }
    }

    this.updateWalls(walls)
    this.calcIntersects(startPoint, trackRays);
  }
}
