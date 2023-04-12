import { checkLineCollision, toRad} from "./linear_operations";
import { Circle } from "./circle";
import { Ray, Point } from "./ray";

export class Polygon {
  sides = 3;
  angle = 0.0 // In degrees
  radius = 10;
  lines: Ray[] = [];
  rotPos : Point[] = []
  vertices: Point[] = [];
  fillColor = "rgba(0,0,0,0)";
  ctx: CanvasRenderingContext2D;
  strokeColor = "rgba(0,0,0,0)";
  position: Point = { x: 0, y: 0 };

  constructor(
    ctx: CanvasRenderingContext2D,
    sides = 3,
    position: Point,
    radius = 10,
    strokeColor = "cyan",  
  ) {
    this.ctx = ctx;
    this.position = position;
    this.strokeColor = strokeColor;
    this.sides = sides;
    this.radius = radius;
    this.createPoints();
    this.position = this.getCenterPosition();
    this.update();
  }

  draw(vertices?:Point[]) {
    vertices = vertices === undefined ? this.vertices : vertices
    this.ctx.strokeStyle = this.strokeColor
    this.ctx.beginPath();
    this.ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      let pos = vertices[i];
      this.ctx.lineTo(pos.x, pos.y);
    }  
    this.ctx.closePath();
    this.ctx.stroke();
  }

  createPoints() {
    for (let angle = 0; angle <= 360; angle += Math.floor(360 / this.sides)) {
      let radians = toRad(angle);

      let posX = Math.cos(radians) * this.radius + (this.position.x);
      let posY = Math.sin(radians) * this.radius + (this.position.y) ;

      this.vertices.push({ x: posX, y: posY });
    }
  }

  getLines() {
    let lines: Ray[] = [];
    let p1 = this.rotPos[0];
    let p2 = this.rotPos[this.rotPos.length - 1];
    lines.push(new Ray(p1, p2));
    for (let i = 0; i < this.rotPos.length - 1; i++) {
      p1 = this.rotPos[i];
      p2 = this.rotPos[i + 1];
      let line = new Ray(p1, p2);
      lines.push(line);
    }
    return lines;
  }

  checkInside(ray: Ray) {
    let count = 0;
    let sides = this.getLines();
    for (let side of sides) {
      let hit = checkLineCollision(ray, side);
      if (hit) {
        count++;
      }
    }
    return count & 1;
  }

  updatePosition(points: Point[]) {
    this.vertices = points;
  }

  update() {
    this.position = this.getCenterPosition();
    this.rotate()
  }

  getCenterPosition(): Point {
    if (this.sides == 3) {
      return {
        x: (this.vertices[0].x + this.vertices[1].x + this.vertices[2].x) / 3,
        y: (this.vertices[0].y + this.vertices[1].y + this.vertices[2].y) / 3,
      };
    }

    let signedArea = 0;
    let centerX = 0;
    let centerY = 0;

    // Calculate the summation signed area using the shoelace formula
    for (let i = 0; i < this.sides; i++) {
      let x0 = this.vertices[i].x;
      let y0 = this.vertices[i].y;
      let x1 = this.vertices[(i + 1) % this.sides].x;
      let y1 = this.vertices[(i + 1) % this.sides].y;

      let A = x0 * y1 - x1 * y0;

      signedArea += A;
      centerX += (x0 + x1) * A;
      centerY += (y0 + y1) * A;
    }

    signedArea *= 0.5;
    centerX /= 6.0 * signedArea;
    centerY /= 6.0 * signedArea;

    return { x: centerX, y: centerY };
  }

  rotate() {
    this.rotPos = [];

    for (let point of this.vertices) {
      if (point) {
        let pos = {
          x: point.x - this.position.x,
          y: point.y - this.position.y,
        };
        let xPrime =
          pos.x * Math.cos(toRad(this.angle)) - pos.y * Math.sin(toRad(this.angle));
        let yPrime =
          pos.y * Math.cos(toRad(this.angle)) + pos.x * Math.sin(toRad(this.angle));
        this.rotPos.push({
          x: xPrime + this.position.x,
          y: yPrime + this.position.y,
        });
      }
    }
    this.draw(this.rotPos);
  }
}
