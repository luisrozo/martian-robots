import { getModelForClass } from '@typegoose/typegoose';
import * as fs from 'fs';
import mongoose from 'mongoose';
import { MONGO_DATABASE_NAME, MONGO_URI, PATH_TO_OUTPUT_FILE, REGEXP_ROBOT_INITIAL_POSITION, REGEXP_ROBOT_INSTRUCTIONS } from "./constants";
import { Mars } from "./mars";
import { Robot } from "./robot";
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

export const saveRobots = (robots: Robot[]): void => {
    // Stream for txt output file
    const outputFileStream = fs.createWriteStream(PATH_TO_OUTPUT_FILE, { flags: 'w' });

    // Robot model for db
    const RobotModel = getModelForClass(Robot);

    (async () => {

        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: MONGO_DATABASE_NAME })
            .catch(error => {
                console.error('Mongo DB connection error: ', error);
            });

        robots.forEach(async(robot) => {
            // Save to output file
            outputFileStream.write(robot.toString() + '\n');

            // Save to db
            await RobotModel.create(robot as Robot);
        });

    })();

    console.log("Robots info saved in DB!");

}

export const saveMars = (mars: Mars): void => {
    // Mars model for db
    const MarsModel = getModelForClass(Mars);

    (async () => {

        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: MONGO_DATABASE_NAME })
            .catch(error => {
                console.error('Mongo DB connection error: ', error);
            });

        // Save to db
        MarsModel.create(mars as Mars);

    })();

    console.log("Planet info saved in DB!");
}