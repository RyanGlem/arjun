import { Point, Ray } from "./ray";
import { Polygon } from "./polygon";
import { RenderCircle } from "./circle";
import { toDeg, toRad } from "./linear_operations";
import { Rectangle } from "./camera";
import { DirectLight } from "./lights/directional_light";
import { checkLineCollision } from "./linear_operations";
import { Laser } from "./projectiles/laser";

export class Ship extends Polygon {
  mass = 1;
  speed = 0.0;
  force: Point;
  maxSpeed = 10;
  velocity: Point;
  turnSpeed = 0.4;
  laser: Laser
  durability = 100;
  redCol = 55;
  greenCol = this.durability + 100
  shipColor = "cyan";
  playerControlled = false;
  centerCircle: RenderCircle;
  shipLight: DirectLight | null;
  constructor(
    ctx: CanvasRenderingContext2D,
    addLight = false,
    position = { x: 0, y: 0 },
    mass = 1,
    sides = 3,
    radius = 10,
    shipColor = "cyan",
    playerControlled = false
  ) {
    super(ctx, sides, position, radius, shipColor);
    this.velocity = { x: 0, y: 0 };
    this.force = { x: 0, y: 0 };
    this.mass = mass
    let healthColor = `rgb(${this.redCol}, ${this.greenCol}, 0)`
    this.centerCircle = new RenderCircle(
      ctx,
      this.radius / 5,
      this.position.x,
      this.position.y,
      healthColor
    );

    this.laser = new Laser (ctx, new Ray())
    this.playerControlled = playerControlled

    if (addLight) {
      this.shipLight = new DirectLight (ctx, this.position, -45, 45, "cyan", 0.1, 500 )
    } else {
      this.shipLight = null
    } 
  }

  checkHit (ray: Ray) {
    let sides = this.getLines()
    for (let side of sides) {
      let hit = checkLineCollision (ray, side)
      if (hit) {
        return true
      }
    }
  }

  lookAt(trackPoint: Point) {
    if (this.durability > 0) {
      let pointerRay = new Ray(this.position, trackPoint);
      let angle = toDeg(pointerRay.getRayAngle());
      this.angle = angle;
    } 
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

  fire (mouseKey:any, walls : Ray[], ships: Ship [] | Ship) {
    if(mouseKey.mousedown.pressed) {
      let posX = Math.cos (toRad(this.angle)) * 10 + this.rotPos[0].x 
      let posY = Math.sin (toRad(this.angle)) * 10 + this.rotPos[0].y
      
      let pos = {x: posX, y: posY}
      let starterRay = new Ray (this.rotPos[0], pos)
      starterRay.rayExtension(1500)
      this.laser.starter.p1 = starterRay.p1
      this.laser.starter.p2 = starterRay.p2

      this.laser.calculateHits(walls, starterRay)
      this.laser.damageShip(ships)
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
    
    if (this.durability < 0) {
      this.strokeColor = "grey"
      this.speed = 0
      this.angle = 0
      this.velocity.x = 0
      this.velocity.y = 0
    }

  }

  drawShipLight(walls: Ray[]) {
    this.shipLight?.updatePosition (
      {
        x: this.rotPos[0].x,
        y: this.rotPos[0].y
      }
    )
    this.shipLight?.rotate(walls, this.angle)  
  }

  translateCamera(camera: Rectangle) {
    camera.updatePosition({
      x: -this.position.x + this.ctx.canvas.width  / 2 + this.velocity.x * 0.001,
      y: -this.position.y + this.ctx.canvas.height / 2 + this.velocity.y * 0.001
    });
  }
}
