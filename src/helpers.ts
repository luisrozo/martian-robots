import { REGEXP_ROBOT_INITIAL_POSITION, REGEXP_ROBOT_INSTRUCTIONS } from "./constants";
import { SpaceStation } from "./spaceStation";

export const preprocessInputAndSendInformation = (spaceStation: SpaceStation, inputInfo: string[], marsWidth: number, marsHeight: number): void => {

    let i: number = 0;
    let robotInitialPosition: string = '';
    let robotInstructions: string = '';

    const regExpRobotPosition: RegExp = new RegExp(REGEXP_ROBOT_INITIAL_POSITION);
    const regExpRobotInstructions: RegExp = new RegExp(REGEXP_ROBOT_INSTRUCTIONS);

    let infoLine: string = '';
    while(i < inputInfo.length) {

        infoLine = inputInfo[i];

        // Line with robot position information
        if(regExpRobotPosition.test(infoLine)) {

            const [ xCoordinate, yCoordinate ] = infoLine.split(' ');

            if(Number(xCoordinate) >= 0 && Number(xCoordinate) < marsWidth && Number(yCoordinate) >= 0 && Number(yCoordinate) < marsHeight) {

                robotInitialPosition = infoLine;

                if(robotInstructions != '') {
                    
                    spaceStation.setRobotAndExecuteInstructions(robotInitialPosition, robotInstructions);

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
                
                spaceStation.setRobotAndExecuteInstructions(robotInitialPosition, robotInstructions);

                robotInitialPosition = '';
                robotInstructions = '';

            }                    

        } else {
            console.error("FORMAT ERROR: Line '" + infoLine + "' has not proper format. Max. robot instructions: 100.");
        }

        i++;
    }

}