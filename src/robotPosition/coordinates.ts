import { prop } from "@typegoose/typegoose";

/**
 * The coordinates representation of a robot position.
 */
export class Coordinates {

    /**
     * @type { number } The horizontal position of robot.
     */
    @prop()
    private _x: number;

    /**
     * @type { number } The vertical position of robot.
     */
    @prop()
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get xCoordinate(): number {
        return this._x;
    }

    public set xCoordinate(x: number) {
        this._x = x;
    }

    public get yCoordinate(): number {
        return this._y;
    }

    public set yCoordinate(y: number) {
        this._y = y;
    }

}