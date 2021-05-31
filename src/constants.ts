import { InstructionMoveForward } from "./robotInstructions/instructionMoveForward";
import { InstructionTurnLeft } from "./robotInstructions/instructionTurnLeft";
import { InstructionTurnRight } from "./robotInstructions/instructionTurnRight";
import { RemoteController } from "./robotInstructions/remoteController";
import { Orientation } from "./robotPosition/orientation";

type orientationsDict = { [key: string]: Orientation };
type instructionsDict = { [key: string]: RemoteController };

export const REGEXP_PLANET_SIZE: string = '^\\d+\\s{1}\\d+$';

export const REGEXP_ROBOT_INITIAL_POSITION: string = '^\\d+\\s{1}\\d+\\s{1}[NSEW]{1}$';

export const REGEXP_ROBOT_INSTRUCTIONS: string = '^[FLR]{1,100}$';

export const PATH_TO_INPUT_FILE: string = process.cwd() + '/input/input.txt';

export const PATH_TO_OUTPUT_FILE: string = process.cwd() + '/output/output.txt';

export const MONGO_URI: string = 'mongodb://localhost:27017/';

export const MONGO_DATABASE_NAME: string = 'martian_robots';

export const orientations: orientationsDict = {
    ['N']: Orientation.N,
    ['S']: Orientation.S,
    ['E']: Orientation.E,
    ['W']: Orientation.W,
}

export const instructions: instructionsDict = {
    ['L']: new RemoteController(new InstructionTurnLeft()),
    ['R']: new RemoteController(new InstructionTurnRight()),
    ['F']: new RemoteController(new InstructionMoveForward()),
}