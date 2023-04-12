import { Point, Ray } from "./ray";

export const distance = (p1: Point, p2: Point) => {
  return Math.floor(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
};

// Remember Line A  is checking Line B if it collides
export const checkLineCollision = (lineA: Ray, lineB: Ray) => {
  let intersectionX, intersectionY;

  let x1, x2, x3, x4, y1, y2, y3, y4;
  x1 = lineA.p1.x;
  x2 = lineA.p2.x;
  y1 = lineA.p1.y;
  y2 = lineA.p2.y;

  x3 = lineB.p1.x;
  x4 = lineB.p2.x;
  y3 = lineB.p1.y;
  y4 = lineB.p2.y;

  let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (denominator == 0) {
    return false;
  }

  let pA = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  let pB = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;

  if (pA >= 0 && pA <= 1 && pB >= 0 && pB <= 1) {
    intersectionX = x1 + pA * (x2 - x1);
    intersectionY = y1 + pA * (y2 - y1);
    return { x: intersectionX, y: intersectionY };
  } else {
    return false;
  }
};

export const dot = (lineA: Ray, lineB: Ray) => {
  let aX = lineA.p2.x - lineA.p1.x;
  let aY = lineA.p2.y - lineA.p1.y;

  let bX = lineB.p2.x - lineB.p1.x;
  let bY = lineB.p2.y - lineB.p1.y;

  return aX * bX + aY * bY;
};

// Takes in degrees and returns the radians
export const toRad = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

// Takes in the radians and returns degrees
export const toDeg = (radians: number) => {
  return (radians * 180) / Math.PI;
};

export const angleBetween = (lineA: Ray, lineB: Ray) => {
  let dotProduct = dot(lineA, lineB);
  let a = lineA.distance();
  let b = lineB.distance();

  let result = dotProduct / (a * b);

  return Math.acos(result);
};

// Gets the angle from the positive X axis to a point
export const getAngle = (p1: Point, p2: Point) => {
  let a = p2.x - p1.x;
  let b = p2.y - p1.y;
  let radians = Math.atan2(b, a);

  return radians;
};
