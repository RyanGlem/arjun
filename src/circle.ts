import { Ray } from "./ray";

export class Circle {
    x : number
    y : number
    radius : number
    ctx: CanvasRenderingContext2D;
    fillColor:string = "black"
    strokeColor: string = this.fillColor
    constructor(
      ctx: CanvasRenderingContext2D,
      radius : number = 30,
      x: number = 0,
      y: number = 0,
      currentColor : string = "black",
    ) {
      this.ctx = ctx;
      this.x = x
      this.y = y
      this.radius = radius
      this.fillColor = currentColor
      this.update();
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.closePath()
      this.ctx.stroke();
      this.ctx.fill()
    }
  
    update() {
        this.ctx.fillStyle = this.fillColor; 
        this.ctx.strokeStyle = "rgba(0,0,0,0)"
        this.draw();
    }
  
    updatePosition(x: number, y: number) {
      this.x = x
      this.y = y
    }
  
    checkInside (ray:Ray) {
      if ((ray.p1.x - this.x) ** 2 + (ray.p1.y - this.y) ** 2 <= this.radius ** 2) {
        return true;
      } else {
        return false;
      } 
    }
  }