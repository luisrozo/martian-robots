import { Position } from "./robotPosition/position";
import { Context } from "./robotInstructions/context";

/**
 * A Robot settled down on Mars is defined by its current position and its orientation.
 * It will be lost if it falls out of the planet.
 */
export class Robot {

    /**
     * @type { Position } The position represents some coordinates and the robot orientation.
     */
    private _position: Position;

    /**
     * @type { boolean } The robot can be lost travelling around Mars.
     */
    private _isLost: boolean;

    constructor(position: Position) {
        /*console.log("-- Assembling new robot ...");
        console.log("---- Coordinates: " + position.coordinates.xCoordinate + "," + position.coordinates.yCoordinate);
        console.log("---- Orientation: " + position.orientation);*/
        this._position = position;
        this._isLost = false;
    }

    public get position(): Position {
        return this._position;
    }

    public set position(position: Position) {
        this._position = position;
    }

    public get isLost(): boolean {
        return this._isLost;
    }
    public set isLost(value: boolean) {
        this._isLost = value;
    }

    public move(context: Context): void {
        context.executeInstruction(this);
    }

    public toString(): string {
        let robotInfo: string = `${this.position.coordinates.xCoordinate} ${this.position.coordinates.yCoordinate} ${this.position.orientation} `;
        let isLost:string = this._isLost ? 'LOST' : '';

        return robotInfo + isLost;
    }

}