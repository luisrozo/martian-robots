import { Coordinates } from "./coordinates";
import { Orientation } from "./orientation";

/**
 * A Position which represents where a robot currently is, as well as its orientation.
 */
export class Position {

    /**
     * @type { Coordinates } The coordinates (x,y) of a robot current position.
     */
    private _coordinates: Coordinates;

    /**
     * @type { Orientation } The orientation of a robot.
     */
    private _orientation: Orientation;

    constructor(coordinates: Coordinates, orientation: Orientation) {
        this._coordinates = coordinates;
        this._orientation = orientation;
    }

    public get coordinates(): Coordinates {
        return this._coordinates;
    }

    public set coordinates(coordinates: Coordinates) {
        this._coordinates = coordinates;
    }

    public get orientation(): Orientation {
        return this._orientation;
    }

    public set orientation(orientation: Orientation) {
        this._orientation = orientation;
    }

}