import { Circle } from "./circle";
import { Point } from "./ray";

export class rigidBody {
    position : Point = {x:0, y:0}
    velocity : Point = {x:0, y:0}
    force : Point = {x:0, y:0}
    torque = 0.0
    angle = 0.0
    angularVelocity = 0.0
    shape : Circle = new Circle(10, 0, 0)
}