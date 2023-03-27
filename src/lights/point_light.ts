import { Polygon } from "../polygon";
import { DirectLight } from "./directional_light";
import { Point, Ray } from "../ray";

export class PointLight extends DirectLight {
  uniquePoints: Point[] = []

  constructor(ctx: CanvasRenderingContext2D, walls: (Ray | Polygon)[], center = { x: 0, y: 0 }, ) {
    super(ctx, walls, center, 0, 360, "cyan", 1)
    this.ctx = ctx;
    this.position = center;
    
    this.getSceneWalls(walls)
    this.getUniquePoints()
    this.getUniqueRays(center)
    this.createRays(center)
  }

  getUniqueRays (position : Point) {
    for (let i = 0; i < this.uniquePoints.length; i++) {
      let pos = this.uniquePoints[i];
      let ray = new Ray(position, pos);

      let magnitude = ray.distance();
      let angle = ray.getAngle();

      let leftRayEnd = {
        x: magnitude * Math.cos(angle - 0.00001) + position.x,
        y: magnitude * Math.sin(angle - 0.00001) + position.y,
      };

      let rightRayEnd = {
        x: magnitude * Math.cos(angle + 0.00001) + position.x,
        y: magnitude * Math.sin(angle + 0.00001) + position.y,
      };
      
      let rightRay = new Ray(position, rightRayEnd);
      let leftRay = new Ray(position, leftRayEnd);
      leftRay.rayExtension();
      rightRay.rayExtension();
      this.rays.push(leftRay, ray, rightRay);
    }
  }

  drawSightPolygon(lines: Ray[]) {
    let angles = [];
    this.ctx.fillStyle = this.lightColor;

    for (let line of lines) {
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

  // If the walls are moving we have to get the new vertex positions and rebuild all the rays
  updateRays(walls: (Ray | Polygon)[], position?: Point) {
    position = position === undefined ? this.position : position
    this.rays = []
    this.updateWalls(walls)
    this.getUniquePoints()
    this.getUniqueRays(position)
    this.createRays(position)
    this.calcIntersects(position)
  }

  getUniquePoints = () => {
    let pts: Point[] = [];
    this.sceneWalls.forEach((wall) => {
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

    this.uniquePoints = uniquePoints;
  };
}
