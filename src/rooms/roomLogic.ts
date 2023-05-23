import { getAngle, toDeg, toRad } from "../linear_operations";
import { Point, Ray } from "../ray";
import { Vertex } from "./hubState";

export const getCenterPosition = (vertices: Point[]) => {
    return new Vertex ((vertices[0].x + vertices[1].x + vertices[2].x) / 3, (vertices[0].y + vertices[1].y + vertices[2].y) / 3) 
}

export const calculateVelocity = (speed: number, angle: number, velocity:Point, position: Point, mass: number) => {
    let posX = Math.cos(toRad(angle)) * speed + position.x;
    let posY = Math.sin(toRad(angle)) * speed + position.y;

    let forceVector = new Ray(position, { x: posX, y: posY });

    let xSpeed = (forceVector.p2.x - forceVector.p1.x) / mass;
    let ySpeed = (forceVector.p2.y - forceVector.p1.y) / mass;

    velocity.x += xSpeed;
    velocity.y += ySpeed;

    let vt = { x: velocity.x * 0.001, y: velocity.y * 0.001}

    return vt
}

export const serverRotate = (vertices: Vertex[], angle: number) => {
    let rotPos : Vertex[] = [];
    let position = getCenterPosition(vertices)

    for (let point of vertices) {
      if (point) {
        let pos = {
          x: point.x - position.x,
          y: point.y - position.y,
        };
        let xPrime =
          pos.x * Math.cos(toRad(angle)) - pos.y * Math.sin(toRad(angle));
        let yPrime =
          pos.y * Math.cos(toRad(angle)) + pos.x * Math.sin(toRad(angle));
        rotPos.push(new Vertex (xPrime + position.x, yPrime + position.y))
      }
    }
    return rotPos;
}

export const serverAngle = (trackPoint: Point, position: Point) => {
    return toDeg (getAngle(trackPoint, position))
}