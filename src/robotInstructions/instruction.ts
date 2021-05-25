import { Robot } from "../robot";

export interface Instruction {
    executeInstruction(robot: Robot): void;
}