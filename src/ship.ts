import { Polygon } from "./polygon";
import { Point, Ray } from "./ray";
import { toDeg, toRad } from "./linear_operations";
import { Circle } from "./circle";
import { Rectangle } from "./camera";
import { DirectLight } from "./lights/directional_light";

export class Ship extends Polygon {
  mass = 1;
  speed = 0.0;
  force: Point;
  maxSpeed = 10;
  velocity: Point;
  turnSpeed = 0.4;
  shipColor = "cyan";
  centerCircle: Circle;
  playerControlled = false;
  shipLight: DirectLight | null;
  constructor(
    ctx: CanvasRenderingContext2D,
    walls?: (Ray | Polygon)[],
    position = { x: 0, y: 0 },
    sides = 3,
    radius = 10,
    shipColor = "cyan",
    playerControlled = false
  ) {
    super(ctx, sides, position, radius, shipColor);
    this.velocity = { x: 0, y: 0 };
    this.force = { x: 0, y: 0 };
    this.centerCircle = new Circle(
      ctx,
      this.radius / 5,
      this.position.x,
      this.position.y,
      "red"
    );

    this.playerControlled = playerControlled

    if (walls) {
      this.shipLight = new DirectLight (ctx, walls, this.position, -45, 45, "cyan", 0.1, 500 )
    } else {
      this.shipLight = null
    } 
  }

  lookAt(trackPoint: Point) {
    let pointerRay = new Ray(this.position, trackPoint);
    let angle = toDeg(pointerRay.getRayAngle());
    this.angle = angle;
  }

  move(keys: any) {
    if (keys.w.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.speed <= this.maxSpeed) {
          this.speed += 0.001;
        }
      }
    }

    if (keys.s.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        if (this.speed >= -1) {
          this.speed -= 0.001;
        }
      }
    }

    if (keys.a.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        this.angle -= this.turnSpeed * 0.7;
      }
    }

    if (keys.d.pressed) {
      for (let i = 0; i < this.vertices.length; i++) {
        this.angle += this.turnSpeed * 0.7;
      }
    }
  }

  updateSimulation(deltaTime = 0.001, cameraOffset : Point) {
    
    let posX = Math.cos(toRad(this.angle)) * this.speed + this.position.x;
    let posY = Math.sin(toRad(this.angle)) * this.speed + this.position.y;

    let forceVector = new Ray(this.position, { x: posX, y: posY });

    let xSpeed = (forceVector.p2.x - forceVector.p1.x) / this.mass;
    let ySpeed = (forceVector.p2.y - forceVector.p1.y) / this.mass;
    this.velocity.x += xSpeed;
    this.velocity.y += ySpeed;

    let vt = {x: this.velocity.x * deltaTime, y: this.velocity.y * deltaTime}
    
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].x += vt.x;
      this.vertices[i].y += vt.y;
      this.rotPos[i].x += vt.x
      this.rotPos[i].y += vt.y
    }

    let center = this.getCenterPosition()

    this.centerCircle.update()
    if (this.playerControlled) {
      this.centerCircle.updatePosition(this.position.x + cameraOffset.x,  this.position.y + cameraOffset.y)
    }  else {
      this.centerCircle.updatePosition(center.x + vt.x, center.y + vt.y)
    }   
  }

  drawShipLight(walls: (Ray | Polygon)[]) {
    this.shipLight?.updatePosition (
      {
        x: this.rotPos[0].x,
        y: this.rotPos[0].y
      }
    )
    this.shipLight?.updateWalls(walls)
    this.shipLight?.rotate(this.angle)  
  }

  translateCamera(camera: Rectangle) {
    camera.updatePosition({
      x: -this.position.x + this.ctx.canvas.width / 2 + this.velocity.x * 0.001,
      y: -this.position.y + this.ctx.canvas.height / 2 + this.velocity.y * 0.001
    });
  }
}
