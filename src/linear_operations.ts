import { Point, Ray } from "./ray";
import { Circle } from "./circle"

export const distance = (p1: Point, p2: Point) => {
  return Math.floor(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
};

export const distanceFloat = (p1: Point, p2: Point) => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

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

export const checkCircleCollision = (circleA : Circle, circleB: Circle) => {
  let dist = distanceFloat(circleA.center, circleB.center)

  if (dist <= circleA.radius + circleB.radius) {
    return true
  } else {
    return false
  }
}

export const checkPointCircleCollision = (pt : Point, circle : Circle) => {
  let dist = distanceFloat (circle.center, pt)

  if (dist <= circle.radius) {
    return true
  } else {
    return false
  }
}

export const checkLinePointCollision = (line : Ray, point: Point) => {
  let lineLength = line.distance()
  let dist1 = distanceFloat(point, line.p1)
  let dist2 = distanceFloat(point, line.p2)
  let buffer = 0.1

  if (dist1 + dist2 >= lineLength - buffer && dist1 + dist2 <= lineLength + buffer) {
    return true
  } else {
    return false
  }
}

export const checkLineCircleCollision = (line : Ray, circle : Circle) => {
  let inside1 = checkPointCircleCollision (line.p1, circle)
  let inside2 = checkPointCircleCollision (line.p2, circle)
  if (inside1) return line.p1
  if (inside2) return line.p2
  let lineDistance = line.distance()
  let dot = dotCircle (line, circle) / (lineDistance ** 2)
  let p1 = line.p1
  let p2 = line.p2

  let closest = {x: p1.x + (dot * (p2.x - p1.x)), y: p1.y + (dot * (p2.y - p1.y))}

  let onSegment = checkLinePointCollision(line, closest)
  if (!onSegment) return false;

  let c = circle.center

  let dist = distanceFloat(c, closest)
  if (dist <= circle.radius) {
    return closest
  } else {
    return false
  }
}

export const dotCircle = (line : Ray, circle : Circle) => {
  let c = circle.center
  let p1 = line.p1
  let p2 = line.p2

  return (((c.x - p1.x) * (p2.x - p1.x)) + ((c.y - p1.y) * (p2.y - p1.y)))

}
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

export const lerp = (p1: Point, p2: Point, t: number) => {
  let xComp = p1.x + t * (p2.x - p1.x)
  let yComp = p1.y + t * (p2.y - p1.y)

  return {x: xComp, y: yComp}
}

export const rotatePoints = (vertices: Point [], angle: number, origin: Point) => {
  let rotPos : Point[] = [];

    for (let point of vertices) {
      if (point) {
        let pos = {
          x: point.x - origin.x,
          y: point.y - origin.y,
        };
        let xPrime =
          pos.x * Math.cos(toRad(angle)) - pos.y * Math.sin(toRad(angle));
        let yPrime =
          pos.y * Math.cos(toRad(angle)) + pos.x * Math.sin(toRad(angle));
        rotPos.push({x:xPrime + origin.x, y:yPrime + origin.y})
      }
    }
    return rotPos;
}

export const calculateVelocity = (speed: number, angle: number, position: Point, mass: number) => {
  let posX = Math.cos(toRad(angle)) * speed + position.x;
  let posY = Math.sin(toRad(angle)) * speed + position.y;

  let forceVector = new Ray(position, { x: posX, y: posY });

  let xSpeed = (forceVector.p2.x - forceVector.p1.x) / mass;
  let ySpeed = (forceVector.p2.y - forceVector.p1.y) / mass;

  let vt = { x: xSpeed, y: ySpeed }

  return vt
}
