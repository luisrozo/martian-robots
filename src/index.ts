import { REGEXP_PLANET_SIZE, REGEXP_ROBOT_INITIAL_POSITION, REGEXP_ROBOT_INSTRUCTIONS } from "./constants";
import { Mars } from "./mars";
import { SpaceStation } from "./spaceStation";

const sampleInput: string[] = [
    '5 3',
    '6 1 E',
    'RFRFRFRF',
    '3 2 N',
    'FRRFLLFFRRFLL',
    '0 3 W',
    'LLFFFLFLFL'
];

let mars: Mars;

const planetSize: string | undefined = sampleInput.shift();

// Check if input is empty
if(planetSize) {

    const regExpPlanetSize: RegExp = new RegExp(REGEXP_PLANET_SIZE);

    // Check if planet coordinates are properly described in file
    if(regExpPlanetSize.test(planetSize)) {

        // Check if the rest of the information is properly formatted
        if(sampleInput.length && (sampleInput.length % 2 == 0)) {

            const [ marsUpperRightXCoordinate, marsUpperRightYCoordinate ] = planetSize.split(' ');

            const marsWidth: number = (Number(marsUpperRightXCoordinate) > 50 || Number(marsUpperRightXCoordinate) < 1) ? 51 : Number(marsUpperRightXCoordinate) + 1;
            const marsHeight: number = (Number(marsUpperRightYCoordinate) > 50 || Number(marsUpperRightYCoordinate) < 1) ? 51 : Number(marsUpperRightYCoordinate) + 1;

            console.log("Found Mars planet of dimensions: " + marsWidth + "x" + marsHeight);

            mars = new Mars(marsWidth, marsHeight);

            const spaceStation: SpaceStation = new SpaceStation(mars);

            // Preprocess input line by line, in order to clean information up and send it properly formatted to SpaceStation class
            let i: number = 0;
            let robotInitialPosition: string = '';
            let robotInstructions: string = '';

            const regExpRobotPosition: RegExp = new RegExp(REGEXP_ROBOT_INITIAL_POSITION);
            const regExpRobotInstructions: RegExp = new RegExp(REGEXP_ROBOT_INSTRUCTIONS);

            let infoLine: string = '';
            while(i < sampleInput.length) {

                infoLine = sampleInput[i];

                // Line with robot position information
                if(regExpRobotPosition.test(infoLine)) {

                    const [ xCoordinate, yCoordinate ] = infoLine.split(' ');

                    if(Number(xCoordinate) >= 0 && Number(xCoordinate) < marsWidth && Number(yCoordinate) >= 0 && Number(yCoordinate) < marsHeight) {
                        robotInitialPosition = infoLine;

                        if(robotInstructions != '') {
                            spaceStation.setRobotsAndExecuteInstructions(robotInitialPosition, robotInstructions);
    
                            robotInitialPosition = '';
                            robotInstructions = '';
                        }                        
                    } else {
                        console.error("FORMAT ERROR: Robot coordinates out of bounds. X coordinate must be between 0 and planet width - 1. Y coordinate must be between 0 and planet height - 1.");
                    }

                // Line with robot instructions information
                } else if(regExpRobotInstructions.test(infoLine)) {

                    robotInstructions = infoLine;

                    if(robotInitialPosition != '') {
                        spaceStation.setRobotsAndExecuteInstructions(robotInitialPosition, robotInstructions);

                        robotInitialPosition = '';
                        robotInstructions = '';
                    }                    

                } else {
                    console.error("FORMAT ERROR: Line '" + infoLine + "' has not proper format. Max. robot instructions: 100.");
                }

                i++;
            }

            mars.robots.forEach(robot => {
                console.log(robot.toString());
            });

        } else {
            console.error("FORMAT ERROR: Mars info must include two lines of information for each robot (one for position and another for instructions).");
        }

    } else {
        console.error("FORMAT ERROR: Input file must include, in the first line, the planet size with the format \"width height\" (values from 1 to 50).");
    }

} else {
    console.log("FILE CONTENT ERROR: file must contain information about Mars width and height.");
}
