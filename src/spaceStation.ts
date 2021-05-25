import { Mars } from "./mars";
import { instructions, orientations } from "./constants";
import { Coordinates } from "./robotPosition/coordinates";
import { Position } from "./robotPosition/position";
import { Robot } from "./robot";
import { Orientation } from "./robotPosition/orientation";

export class SpaceStation {

    private _mars: Mars;

    constructor(mars: Mars) {
        //console.log(" ! INITIALIZE SPACE STATION ! ");
        this._mars = mars;
    }

    public setRobotsAndExecuteInstructions(robotsInfo: string[]): void {

        //console.log("--> SETTING ROBOTS <--");

        let robotInitialPosition: string, robotInstructions: string;

        robotsInfo.forEach( (robotLine, index) => {
    
            if(!(index % 2)) {

                robotInitialPosition = robotLine;

            } else {

                robotInstructions = robotLine;
        
                this.executeRobotInstructions(robotInitialPosition, robotInstructions);
            }
        
        });

    }

    private executeRobotInstructions(robotInitialPosition: string, robotInstructions: string): void {

        const [ initialX, initialY, initialOrientation ] = robotInitialPosition.split(' ');
        const coordinates: Coordinates = new Coordinates(Number(initialX), Number(initialY));
        const position: Position = new Position(coordinates, orientations[initialOrientation]);

        const robot: Robot = new Robot(position);
        this._mars.addRobot(robot);

        for(let i = 0; !robot.isLost && i < robotInstructions.length; i++) {
            const instruction = robotInstructions[i];

            if(!robot.isLost) {

                /*console.log("\n NEW INSTRUCTION")
                console.log("Robot current position: " + robot.position.coordinates.xCoordinate + ' ' + robot.position.coordinates.yCoordinate + ' ' + robot.position.orientation);
                console.log("Instruction: " + instruction);*/

                if(instruction == 'F' && this.isRobotGoingToFall(robot.position)) {
                    
                    const currentRobotCoordinates: Coordinates = robot.position.coordinates;

                    if(!this._mars.positionHasRobotScent(currentRobotCoordinates)) {
                        //console.log("NOOO, THERE'S NO SCENT AND ROBOT'S GONNA TO FAAAAAAAALL......");
                        this.setRobotAsLost(robot);
                    } else {
                        //console.log("There's some robots scent. Ignoring instruction.");
                    }
                    
                } else {
                    robot.move(instructions[instruction]);
                }
            }
        }

        //console.log("\nFinal position robot: " + robot);
    }

    private isRobotGoingToFall(robotCurrentPosition: Position): boolean {
        let isGoingToFall: boolean = false;

        switch(robotCurrentPosition.orientation) {
            case Orientation.N:
                if(robotCurrentPosition.coordinates.yCoordinate == this._mars.height - 1) {
                    isGoingToFall = true;
                }
                break;
            
            case Orientation.S:
                if(robotCurrentPosition.coordinates.yCoordinate == 0) {
                    isGoingToFall = true;
                }
                break;

            case Orientation.E:
                if(robotCurrentPosition.coordinates.xCoordinate == this._mars.width - 1) {
                    isGoingToFall = true;
                }
                break;

            case Orientation.W:
                if(robotCurrentPosition.coordinates.xCoordinate == 0) {
                    isGoingToFall = true;
                }
                break;
            
            default:
                console.error('invalid orientation');
        }


        return isGoingToFall;
    }

    private setRobotAsLost(robot: Robot): void {
        robot.isLost = true;
        this._mars.incrementLostRobots();

        const coordinatesWithNewRobotScent: Coordinates = robot.position.coordinates;
        this._mars.setNewPositionWithRobotScent(coordinatesWithNewRobotScent);
    }

}