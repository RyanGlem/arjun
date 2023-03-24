import { Ray, Point } from "./ray";

export class Line extends Ray {
  ctx: CanvasRenderingContext2D;
  currentColor: string;
  constructor(
    ctx: CanvasRenderingContext2D,
    p1: Point,
    p2: Point,
    currentColor: string = "black"
  ) {
    super(p1, p2)
    this.ctx = ctx;
    this.currentColor = currentColor;
    this.update();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.stroke();
    this.ctx.closePath()
    
  }

  update() {
    this.ctx.strokeStyle = this.currentColor;
    this.draw();
  }

  updatePosition(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  checkInside () {
    return null
  }

}
