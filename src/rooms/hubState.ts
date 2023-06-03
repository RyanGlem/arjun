import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";
import { toRad } from "../linear_operations";

let getRandX = () => {
  return Math.floor(Math.random() * 1000);
};

let getRandY = () => {
  return Math.floor(Math.random() * 500);
};

let createPoints = (sides = 3, radius = 10, position: {x: number, y:number}) => {
  let vertices = new ArraySchema<Vertex>()
  for (let angle = 0; angle <= 360; angle += Math.floor(360 / sides)) {
    let radians = toRad(angle);
    let posX = Math.cos(radians) * radius + position.x;
    let posY = Math.sin(radians) * radius + position.y;


    vertices.push(new Vertex(posX, posY));
  }

  return vertices
}

export type InputKeys = {
  w: {
    pressed: boolean;
  };
  s: {
    pressed: boolean;
  };
  a: {
    pressed: boolean;
  };
  d: {
    pressed: boolean;
  };
};

export class Vertex extends Schema {
  @type("number") x!: number;
  @type("number") y!: number;

  constructor (x: number, y:number) {
    super()
    this.x = x
    this.y = y
  }
}

export class Ship extends Schema {
  @type("number") x: number | undefined;
  @type("number") y: number | undefined;
  @type("number") angle = 0
  @type("number") speed = 0;
  @type("number") maxSpeed = 20
  @type ([Vertex]) vertices: Vertex[] 
  @type (Vertex) velocity: Vertex = new Vertex(0, 0)

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
    this.vertices = createPoints(3, 10, {x: this.x, y: this.y})
  }
}

export class Player extends Schema {
  @type("number") x: number = getRandX();
  @type("number") y: number = getRandY();
  
  @type("number") angle: number = 0
  @type (Vertex) position = new Vertex (this.x, this.y)
  @type (Ship) ship: Ship = new Ship(this.x, this.y)

  inputQueue: InputKeys[] = []
}

export class State extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
