import { Ray, Point } from "./ray";

export const drawCirlce = (ctx: CanvasRenderingContext2D, x = 0 , y = 0, radius = 1, fillColor = "red", strokeColor = "rgba(0,0,0,0)") => {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

export class Circle {
  x: number;
  y: number;
  radius: number;
  mass = 1
  moi: number = 1
  center: Point = { x: 0, y: 0 };
  constructor(radius: number = 1, x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.center = { x: x, y: y };
  }
}

export class RenderCircle {
  
  circle: Circle;
  fillColor: string = "black";
  ctx: CanvasRenderingContext2D;
  strokeColor: string = this.fillColor;
  constructor(
    ctx: CanvasRenderingContext2D,
    radius: number = 30,
    x: number = 0,
    y: number = 0,
    currentColor: string = "black",
    strokeColor: string = "rgba(0,0,0,0)",
  ) {
    this.ctx = ctx;
    this.fillColor = currentColor;
    this.strokeColor = strokeColor
    this.circle = new Circle(radius, x, y);
    this.update();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }

  update() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.strokeStyle = this.strokeColor;
    this.draw();
  }

  updatePosition(x: number, y: number) {
    this.circle.x = x;
    this.circle.y = y;
    this.circle.center = {x: x, y: y}
  }

  move (keys:any) {
    if (keys.w.pressed) {
      this.updatePosition(this.circle.x, this.circle.y -=1)
    }

    if (keys.s.pressed) {
      this.updatePosition(this.circle.x, this.circle.y +=1)
      
    }
    
    if (keys.a.pressed) {
      this.updatePosition(this.circle.x -=1, this.circle.y)

    }

    if (keys.d.pressed) {
      this.updatePosition(this.circle.x +=1, this.circle.y)
    }
  }

  checkInside(ray: Ray) {
    if (
      (ray.p1.x - this.circle.x) ** 2 + (ray.p1.y - this.circle.y) ** 2 <=
      this.circle.radius ** 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
