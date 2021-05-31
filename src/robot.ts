import { prop } from '@typegoose/typegoose';
import { RemoteController } from "./robotInstructions/remoteController";
import { Position } from "./robotPosition/position";


/**
 * A Robot settled down on Mars is defined by its current position and its orientation.
 * It will be lost if it falls out of the planet.
 */
export class Robot {

    @prop()
    private _position: Position;

    @prop()
    private _isLost: boolean;

    @prop()
    private _exploredSurface: number;

    constructor(position: Position) {
        this._position = position;
        this._isLost = false;
        this._exploredSurface = 0;
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

    public get exploredSurface(): number {
        return this._exploredSurface;
    }

    /**
     * Increment robot explored surface in given steps.
     * 
     * @param steps - The numbers of Robot steps.
     */
    public incrementExploredSurface(steps: number): void {
        this._exploredSurface += steps;
    }

    /**
     * Execute a given instruction (via remote controller).
     * 
     * @param remoteController - The remote controller that indicates what a given instruction means.
     */
    public move(remoteController: RemoteController): void {
        remoteController.executeInstruction(this);
    }

    public toString(): string {
        let robotInfo: string = `${this.position.coordinates.xCoordinate} ${this.position.coordinates.yCoordinate} ${this.position.orientation} `;
        let isLost:string = this._isLost ? 'LOST' : '';

        return robotInfo + isLost;
    }

}