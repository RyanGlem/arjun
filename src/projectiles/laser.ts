import { Reflectors } from "../reflectors";
import { Ship } from "../ship"
import { Ray } from "../ray";

export class Laser extends Reflectors {
    damage = 0.25

    constructor (ctx:CanvasRenderingContext2D, starter:Ray) {
        super(ctx, starter)
    }

    damageShip(ships: Ship[] | Ship) {
        for (let reflector of this.reflectorRays) {
            if (Array.isArray(ships)) {
                for (let ship of ships) {
                    if (ship.checkHit(reflector)) {
                        if (ship.durability > -1) {
                           ship.durability -= this.damage
                           ship.redCol += this.damage * 10
                           ship.greenCol -= this.damage * 2
                           ship.centerCircle.fillColor = `rgb(${ship.redCol}, ${ship.greenCol}, 0)`  
                        } 
                    }
                }
            } else {
                if (ships.checkHit(reflector)) {
                    if (ships.durability > -1) {
                       ships.durability -= this.damage
                       ships.centerCircle.fillColor = `rgb(55, ${ships.durability + 100}, 0)` 
                    } 
                }
            }
        }
    }
}