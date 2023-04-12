import {Point} from "./ray"

export class Rectangle {
  topLeftPos: Point = {x:0, y:0}
  topRightPos: Point = {x:0 , y:0}
  bottomRightPos :Point = {x:0, y:0}
  bottomLeftPos : Point ={x:0, y:0}
  width = 0;
  height = 0;

  constructor(startPoint:Point, width: number, height: number) {
    this.topLeftPos = startPoint
    this.topRightPos = {x: startPoint.x + width, y: startPoint.y}
    this.bottomRightPos = {x: startPoint.x + width, y: startPoint.y + height}
    this.bottomLeftPos = {x: startPoint.x, y: startPoint.y + height}
    this.width = width
    this.height = height
  }

  updatePosition (startPoint : Point) {
    this.topLeftPos = startPoint
    this.topRightPos = {x: startPoint.x + this.width, y: startPoint.y}
    this.bottomRightPos = {x: startPoint.x + this.width, y: startPoint.y + this.height}
    this.bottomLeftPos = {x: startPoint.x, y: startPoint.y + this.height}
  }
}

