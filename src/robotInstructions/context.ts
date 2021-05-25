import { Instruction } from "./instruction";
import { Robot } from "../robot";

/**
 * The context defines the interface of the diferent robot instructions.
 */
export class Context {

    /**
     * @type { Instruction } The context maintains a reference to one
     * type of instruction to be executed.
     */
    private instruction: Instruction;

    constructor(instruction: Instruction) {
        this.instruction = instruction;
    }

    public setInstruction(instruction: Instruction) {
        this.instruction = instruction;
    }

    public executeInstruction(robotToMove: Robot): void {
        
        this.instruction.executeInstruction(robotToMove);

    }
}