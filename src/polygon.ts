import { checkLineCollision } from './linear_operations'
import { Ray, Point } from './ray'

export class Polygon {
    sides : number = 3
    radius : number = 10
    lines : Ray[] = []
    vertices : Point[] = []
    ctx : CanvasRenderingContext2D
    position : Point = {x: 0, y: 0}
    constructor(ctx:CanvasRenderingContext2D, sides : number = 3, position : Point, radius? : number) {
        this.ctx = ctx
        this.position = position
        this.sides = sides
        if (radius) this.radius = radius
        this.createPoints()
        this.update()
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo (this.vertices[0].x, this.vertices[0].y)
        for (let i = 1; i < this.vertices.length; i++) {
            let pos = this.vertices[i]
            this.ctx.lineTo (pos.x, pos.y)
        }

        this.ctx.closePath()
        this.ctx.stroke()
    }

    createPoints () {
        for (let angle = 0; angle < Math.PI * 2 ; angle+= (Math.PI * 2)/this.sides) {

            let posX = Math.cos (angle + 5) * this.radius + this.position.x
            let posY = Math.sin (angle + 5) * this.radius + this.position.y

            this.vertices.push ({x:posX, y:posY})
        }
    }

    getLines () {
        let lines : Ray[] = []
        let p1 = this.vertices[0]
        let p2 = this.vertices[this.vertices.length - 1]
        lines.push (new Ray (p1, p2))

        for (let i = 0; i < this.vertices.length - 1; i++) {
            p1 = this.vertices[i]
            p2 = this.vertices[i + 1]
            let line = new Ray (p1, p2)
            lines.push(line)
        }  
        return lines
    }

    checkInside(ray:Ray) {
        let count = 0;
        let sides = this.getLines()
        for (let side of sides) {
            let hit = checkLineCollision(ray, side)
            if (hit) {
                count++
            }
        }
        return count & 1
    }

    updatePosition (points: Point[]) {
        this.vertices = points
    }

    update() {
        this.ctx.strokeStyle = "white"
        this.draw()
    }
}