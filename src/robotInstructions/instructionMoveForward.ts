import { Instruction } from "./instruction";
import { Robot } from "../robot";
import { Orientation } from "../robotPosition/orientation";

/**
 * A instruction for a robot. If executed, the robot will take one step forward,
 * keeping its orientation.
 */
export class InstructionMoveForward implements Instruction {

    /**
     * Execute a instruction which make a robot take a step forward.
     * 
     * @param robot - The robot which will execute an instruction.
     * 
     * @override
     */
    public executeInstruction(robot: Robot): void {
        switch(robot.position.orientation) {

            case Orientation.N:
                robot.position.coordinates.yCoordinate += 1;
                break;
            
            case Orientation.S:
                robot.position.coordinates.yCoordinate -= 1;
                break;

            case Orientation.E:
                robot.position.coordinates.xCoordinate += 1;
                break;

            case Orientation.W:
                robot.position.coordinates.xCoordinate -= 1;
                break;
            
            default:
                console.error('invalid orientation');
        }
    }
}