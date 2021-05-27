import { Robot } from "./robot";
import { Coordinates } from "./robotPosition/coordinates";

/**
 * Mars is a bidimensional planet with some width and height.
 * Also, it has some robots in its surface.
 * Some of the robots can be lost falling over the planet, 
 * leaving some scent in the last cell they stepped.
 */
export class Mars {

    private _width: number;

    private _height: number;

    private _robots: Robot[];

    private _lostRobots: number;

    private _positionsWithRobotScent: Coordinates[];

    constructor(width: number, height: number) {
        
        this._width = width;
        this._height = height;
        this._robots = [];
        this._lostRobots = 0;
        this._positionsWithRobotScent = [];

    }

    public get width(): number {
        return this._width;
    }
    public set width(width: number) {
        this._width = width;
    }

    public get height(): number {
        return this._height;
    }
    public set height(height: number) {
        this._width = height;
    }

    public get robots(): Robot[] {
        return this._robots;
    }
    public set robots(value: Robot[]) {
        this._robots = value;
    }

    public get lostRobots(): number {
        return this._lostRobots;
    }

    public get positionsWithRobotScent(): Coordinates[] {
        return this._positionsWithRobotScent;
    }

    /**
     * Adds a new robot to Mars.
     * 
     * @param robot - The robot to be added.
     */
    public addRobot(robot: Robot): void {
        this._robots.push(robot);
    }
    
    /**
     * Increment the number of lost robots in planet.
     */
    public incrementLostRobots(): void {
        this._lostRobots++;
    }

    /**
     * Sets robot scent to one cell of the planet.
     * 
     * @param coordinates - The exact planet cell to set the robot scent.
     */
    public setNewPositionWithRobotScent(coordinates: Coordinates): void {
        this._positionsWithRobotScent.push(coordinates);
    }

    /**
     * Checks if some planet cell has already robot scent.
     * 
     * @param coordinates - The coordinates of the planet to check.
     * 
     * @returns Whether the given cell has already scent or not.
     */
    public positionHasRobotScent(coordinates: Coordinates): boolean {
        return this._positionsWithRobotScent.some( positionWithRobotScent => positionWithRobotScent.xCoordinate == coordinates.xCoordinate && positionWithRobotScent.yCoordinate == coordinates.yCoordinate);
    }

}