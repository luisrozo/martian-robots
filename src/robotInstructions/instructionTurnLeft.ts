import { Instruction } from "./instruction";
import { Robot } from "../robot";
import { Orientation } from "../robotPosition/orientation";

/**
 * A instruction for a robot. If executed, the robot will turn 90º left.
 */
export class InstructionTurnLeft implements Instruction {

    /**
     * Execute a instruction which make a robot turn left.
     * 
     * @param robot - The robot which will execute an instruction.
     * 
     * @override
     */
    public executeInstruction(robot: Robot): void {
        switch(robot.position.orientation) {

            case Orientation.N:
                robot.position.orientation = Orientation.W;
                break;
            
            case Orientation.S:
                robot.position.orientation = Orientation.E;
                break;

            case Orientation.E:
                robot.position.orientation = Orientation.N;
                break;

            case Orientation.W:
                robot.position.orientation = Orientation.S;
                break;
            
            default:
                console.error('invalid orientation');
        }
    }
}