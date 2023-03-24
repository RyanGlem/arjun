export interface Point {
  x: number;
  y: number;
}

export class Ray {
  p1: Point = { x: 0, y: 0 };
  p2: Point = { x: 0, y: 0 };
  constructor(p1?: Point, p2?: Point) {
    this.p1 = p1 === undefined ? this.p1 : p1;
    this.p2 = p2 === undefined ? this.p2 : p2;
  }

  distance() {
    return Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2)
  }

  slope() {
    if (this.p1.x - this.p2.x != 0) {
      return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
    }
    return Number.MAX_VALUE;
  }

  normalize() {
    let normalX = this.p2.x - this.p1.x;
    let normalY = this.p2.y - this.p1.y;
    let normalLength = this.distance();

    normalX = normalX / normalLength;
    normalY = normalY / normalLength;

    return { x: normalX, y: normalY };
  }

  rayExtension = (distance:number = 1500) => {
    let normal = this.normalize();

    let xPos = this.p2.x + distance * normal.x;
    let yPos = this.p2.y + distance * normal.y;

    this.p2 = { x: xPos, y: yPos };
  };

  getAngle = () => {
    let a = this.p2.x - this.p1.x
    let b = this.p2.y - this.p1.y
    let radians = Math.atan2(b, a)

    return radians
  }
}
