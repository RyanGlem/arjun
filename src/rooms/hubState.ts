import { Schema, MapSchema, type } from "@colyseus/schema";

let getRandX = () => {
  return Math.floor(Math.random() * 1000);
};

let getRandY = () => {
  return Math.floor(Math.random() * 500);
};

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

export class Player extends Schema {
  @type("number") x: number = getRandX();
  @type("number") y: number = getRandY();

  inputQueue: InputKeys[] = []
}

export class State extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
