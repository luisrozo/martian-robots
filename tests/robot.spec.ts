import { expect } from 'chai';
import 'mocha';
import { instructions, orientations } from '../src/constants';
import { Robot } from '../src/robot';
import { Context } from '../src/robotInstructions/context';
import { Coordinates } from '../src/robotPosition/coordinates';
import { Orientation } from '../src/robotPosition/orientation';
import { Position } from '../src/robotPosition/position';

describe("test robot instructions", () => {

    const initialXCoordinate: number = 2;
    const initialYCoordinate: number = 3;
    const initialOrientationString: string = "N";

    const instructionTurnLeft: string = "L";
    const instructionTurnRight: string = "R";
    const instructionMoveForward: string = "F";

    let initialCoordinates: Coordinates;
    let initialOrientation: Orientation;
    let initialPosition: Position;

    let instruction: Context;

    let robot: Robot;

    beforeEach(() => {
        initialCoordinates = new Coordinates(initialXCoordinate, initialYCoordinate);
        initialOrientation = orientations[initialOrientationString];
        initialPosition = new Position(initialCoordinates, initialOrientation);

        robot = new Robot(initialPosition);
    });

    it("should turn the robot 90º left, keeping the same coordinates position", () => {

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 3;
        const expectedOrientation: Orientation = Orientation.W;
        const expectedExploredSurface: number = 0;

        instruction = instructions[instructionTurnLeft];

        robot.move(instruction);

        expect(robot.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robot.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robot.position.orientation).to.be.equal(expectedOrientation);
        expect(robot.exploredSurface).to.be.equal(expectedExploredSurface);

    });

    it("should turn the robot 90º right, keeping the same coordinates position", () => {

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 3;
        const expectedOrientation: Orientation = Orientation.E;
        const expectedExploredSurface: number = 0;

        instruction = instructions[instructionTurnRight];

        robot.move(instruction);

        expect(robot.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robot.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robot.position.orientation).to.be.equal(expectedOrientation);
        expect(robot.exploredSurface).to.be.equal(expectedExploredSurface);

    });

    it("should move the robot one step forward, keeping the same orientation", () => {

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 4;
        const expectedOrientation: Orientation = Orientation.N;
        const expectedExploredSurface: number = 1;

        instruction = instructions[instructionMoveForward];

        robot.move(instruction);

        expect(robot.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robot.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robot.position.orientation).to.be.equal(expectedOrientation);
        expect(robot.exploredSurface).to.be.equal(expectedExploredSurface);

    });

    it("should move the robot a few instructions", () => {

        const expectedXCoordinate: number = 5;
        const expectedYCoordinate: number = 4;
        const expectedOrientation: Orientation = Orientation.W;
        const expectedExploredSurface: number = 4;

        const instructionsList: string = "FRFFFLL";

        for(let i = 0; i < instructionsList.length; i++) {
            instruction = instructions[instructionsList[i]];
            robot.move(instruction);
        }

        expect(robot.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robot.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robot.position.orientation).to.be.equal(expectedOrientation);
        expect(robot.exploredSurface).to.be.equal(expectedExploredSurface);

    });

    it("should not make the robot moves as it doesn't receive any instruction", () => {

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 3;
        const expectedOrientation: Orientation = Orientation.N;
        const expectedExploredSurface: number = 0;

        const instructionsList: string = "";

        for(let i = 0; i < instructionsList.length; i++) {
            instruction = instructions[instructionsList[i]];
            robot.move(instruction);
        }

        expect(robot.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robot.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robot.position.orientation).to.be.equal(expectedOrientation);
        expect(robot.exploredSurface).to.be.equal(expectedExploredSurface);

    });

});