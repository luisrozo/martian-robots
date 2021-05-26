import { Context } from "./robotInstructions/context";
import { InstructionTurnLeft } from "./robotInstructions/instructionTurnLeft";
import { InstructionTurnRight } from "./robotInstructions/instructionTurnRight";
import { InstructionMoveForward } from "./robotInstructions/instructionMoveForward";
import { Orientation } from "./robotPosition/orientation";

type orientationsDict = { [key: string]: Orientation };
type instructionsDict = { [key: string]: Context };

export const REGEXP_PLANET_SIZE: string = '^\\d+\\s{1}\\d+$';

export const REGEXP_ROBOT_INITIAL_POSITION: string = '^\\d+\\s{1}\\d+\\s{1}[NSEW]{1}$';

export const REGEXP_ROBOT_INSTRUCTIONS: string = '^[FLR]{1,100}$';

export const orientations: orientationsDict = {
    ['N']: Orientation.N,
    ['S']: Orientation.S,
    ['E']: Orientation.E,
    ['W']: Orientation.W,
}

export const instructions: instructionsDict = {
    ['L']: new Context(new InstructionTurnLeft()),
    ['R']: new Context(new InstructionTurnRight()),
    ['F']: new Context(new InstructionMoveForward()),
}