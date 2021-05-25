import { Instruction } from "./instruction";
import { Robot } from "../robot";
import { Orientation } from "../robotPosition/orientation";

/**
 * A instruction for a robot. If executed, the robot will turn 90º right.
 */
export class InstructionTurnRight implements Instruction {

    public executeInstruction(robot: Robot): void {
        switch(robot.position.orientation) {

            case Orientation.N:
                robot.position.orientation = Orientation.E;
                break;
            
            case Orientation.S:
                robot.position.orientation = Orientation.W;
                break;

            case Orientation.E:
                robot.position.orientation = Orientation.S;
                break;

            case Orientation.W:
                robot.position.orientation = Orientation.N;
                break;
            
            default:
                console.error('invalid orientation');
        }
    }
}