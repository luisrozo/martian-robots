import { Context } from "./robotInstructions/context";
import { InstructionTurnLeft } from "./robotInstructions/instructionTurnLeft";
import { InstructionTurnRight } from "./robotInstructions/instructionTurnRight";
import { InstructionMoveForward } from "./robotInstructions/instructionMoveForward";
import { Orientation } from "./robotPosition/orientation";

type orientationsDict = { [key: string]: Orientation };
type instructionsDict = { [key: string]: Context };

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