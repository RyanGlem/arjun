import { RenderCircle, drawCirlce } from "../circle";
import { Laser } from "./laser";
import { Ray, Point } from "../ray";
import {
  checkLineCollision,
  toDeg,
  toRad,
  angleBetween,
  checkLinePointCollision,
  dot
} from "../linear_operations";
import { Polygon } from "../polygon";
import { drawLine } from "../line";
export class Shell {
  mass = 1;
  speed = 5;
  angle = 0; // In degrees
  bounces: number = 0;
  projectile: RenderCircle;
  forceVector: Ray = new Ray();
  ctx: CanvasRenderingContext2D;
  position: Point = { x: 0, y: 0 };
  velocity: Point = { x: 0, y: 0 };

  constructor(ctx: CanvasRenderingContext2D, position: Point) {
    this.ctx = ctx;
    this.position = position
    this.projectile = new RenderCircle(ctx, 10, position.x, position.y, "rgba(0,0,0,0)","cyan");
  }

  bounce(polygons: Polygon[] | Polygon) {
    let prevPoly
    let newPoly = null
    if (Array.isArray(polygons)) {
      for (let polygon of polygons) {
        let hit = polygon.checkShellHit(this.projectile.circle);

        if (hit) {
          prevPoly = polygon
          let wall = hit.side
          let center = polygon.getCenterPosition()
          let midPoint = {x: (wall.p1.x + wall.p2.x) / 2 , y: (wall.p1.y + wall.p2.y) / 2}
          let rayCenter = new Ray (center, midPoint)
          rayCenter.rayExtension(30)

          // u = (v dot n / n dot n) n
          // w = v - u
          let surfaceNormal = new Ray (midPoint, rayCenter.p2)
          let normalDot = dot(surfaceNormal, surfaceNormal)
          let forceDot = dot (this.forceVector, surfaceNormal)
          let coefficient = (forceDot / normalDot)
          let surfaceComponents = surfaceNormal.getXYComponents()
          drawLine(this.ctx, "blue", surfaceNormal.p1, surfaceNormal.p2)
          
          let p1 = this.forceVector.p1
          let p2 = {x: surfaceComponents.x * coefficient + this.forceVector.p1.x, y: surfaceComponents.y * coefficient + this.forceVector.p1.y}

          let u = new Ray (p1, p2) // u is the ray length
          let w = new Ray (u.p2, this.forceVector.p2)

          // v prime = w - u
          let uComp = u.getXYComponents()
          let wComp = w.getXYComponents()
          let vPrimeX = wComp.x - uComp.x
          let vPrimeY = wComp.y - uComp.y
          
          let velocityVector = new Ray(this.forceVector.p1, {x: vPrimeX + this.forceVector.p1.x, y: vPrimeY + this.forceVector.p1.y})

          let forceNormal = velocityVector.normalize()

          let xSpeed = forceNormal.x * 1200
          let ySpeed = forceNormal.y * 1200
            
          if (!isNaN(forceNormal.x) && !isNaN(forceNormal.y)) {
            this.velocity.x = xSpeed 
            this.velocity.y = ySpeed
            this.position.x += this.velocity.x * 0.001
            this.position.y += this.velocity.y * 0.001
            this.projectile.updatePosition(this.position.x, this.position.y)
          }

          return toDeg(velocityVector.getRayAngle())
        }
      }
    } else {
      if (polygons.checkShellHit(this.projectile.circle)) {
        //return this.angle
      }
    }
  }

  updateSimulation(deltaTime = 0.001, polygons: Polygon[] | Polygon) {
    
    let xSpeed, ySpeed;
    let bounceAngle = this.bounce(polygons);

    if (bounceAngle) {
      this.angle = bounceAngle
    }

    let posX = Math.cos(toRad(this.angle)) * this.speed + this.position.x;
    let posY = Math.sin(toRad(this.angle)) * this.speed + this.position.y;

    this.forceVector.p1 = this.position;
    this.forceVector.p2 = { x: posX, y: posY };

    drawLine (this.ctx, "green", this.forceVector.p1, this.forceVector.p2)

    xSpeed = (this.forceVector.p2.x - this.forceVector.p1.x) / this.mass
    ySpeed = (this.forceVector.p2.y - this.forceVector.p1.y) / this.mass

    this.velocity.x += xSpeed;
    this.velocity.y += ySpeed;
    
    let vt = { x: this.velocity.x * deltaTime, y: this.velocity.y * deltaTime};
    this.position.x += vt.x;
    this.position.y += vt.y;
    
    this.projectile.update();
    this.projectile.updatePosition(this.position.x, this.position.y);
  }

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
