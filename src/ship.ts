import { Polygon } from "./polygon";
import { Point, Ray } from "./ray";
import { toDeg, toRad } from "./linear_operations";

export class Ship extends Polygon {
  velocity : Point
  force : Point
  mass = 1
  speed = 0.0
  maxSpeed = 3
  lookAtAngle = 0
  turnSpeed = 0.4
  vertsPos :Point[] = []
  constructor(
    ctx: CanvasRenderingContext2D,
    position = { x: 0, y: 0 },
    sides = 3,
    radius = 10
  ) {
    super(ctx, sides, position, radius, "cyan");
    this.velocity = {x:0, y:0}
    this.force = {x:0, y:0}
  }

  lookAt(trackPoint: Point) {
    let pointerRay = new Ray(this.position, trackPoint);
    let angle = toDeg(pointerRay.getAngle())
    this.angle = angle
  }

  move(keys: any) {
    if (keys.w.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.speed <= 10) {
          this.speed += 0.001
        }
      }
    }

    if (keys.s.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.speed >= -1) {
          this.speed -= 0.001
        }
      }
    }

    if (keys.a.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        this.angle -= this.turnSpeed * 0.7
      }
    }

    if (keys.d.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        this.angle += this.turnSpeed * 0.7
      }
    }
  }

  updateSimulation(deltaTime: number) {
    let posX = Math.cos (toRad(this.angle)) * this.speed + this.position.x
    let posY = Math.sin (toRad(this.angle)) * this.speed + this.position.y
    

    let forceVector = new Ray(this.position, {x:posX, y:posY})

    let xSpeed = (forceVector.p2.x - forceVector.p1.x) / this.mass
    let ySpeed = (forceVector.p2.y - forceVector.p1.y) / this.mass
    this.velocity.x += xSpeed
    this.velocity.y += ySpeed

    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].x += this.velocity.x * deltaTime
      this.vertices[i].y += this.velocity.y * deltaTime 
    }
  }
}
