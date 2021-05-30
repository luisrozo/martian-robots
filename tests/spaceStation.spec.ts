import { expect } from 'chai';
import 'mocha';
import { orientations } from "../src/constants";
import { Mars } from "../src/mars";
import { Robot } from "../src/robot";
import { Coordinates } from "../src/robotPosition/coordinates";
import { Orientation } from "../src/robotPosition/orientation";
import { SpaceStation } from "../src/spaceStation";

describe("test Space Station", () => {

    const marsWidth: number = 6;
    const marsHeight: number = 4;

    let mars: Mars;
    let spaceStation: SpaceStation;

    beforeEach(() => {
        mars = new Mars(marsWidth, marsHeight);
        spaceStation = new SpaceStation(mars);
    });

    it("should set 1 robot (not-falling) and execute its instructions, keeping information correctly about Mars and Robot status", () => {

        const expectedNumberRobots: number = 1;
        const expectedNumberLostRobots: number = 0;
        const expectedNumberScentCells: number = 0;

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 0;
        const expectedOrientation: Orientation = orientations["S"];

        // Robot placed at 0,0 (N). Expected final position: 2,0 (S)
        const actualRobotIsLost: boolean = spaceStation.setRobotAndExecuteInstructions("0 0 N", "LLLFFR");

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);

        const robotAfterMovement: Robot = mars.robots[0];

        expect(robotAfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robotAfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robotAfterMovement.position.orientation).to.be.equal(expectedOrientation);
        expect(robotAfterMovement.isLost).to.be.false;

        expect(actualRobotIsLost).to.be.false;

    });

    it("should set 1 robot (falling) and execute its instructions, keeping information correctly about Mars and Robot status", () => {

        const expectedNumberRobots: number = 1;
        const expectedNumberLostRobots: number = 1;
        const expectedNumberScentCells: number = 1;

        const expectedXCoordinate: number = 5;
        const expectedYCoordinate: number = 0;
        const expectedOrientation: Orientation = orientations["E"];

        // Robot placed at 3,0 (N). Expected final position: 5,0 (E)
        const actualRobotIsLost: boolean = spaceStation.setRobotAndExecuteInstructions("3 0 N", "RFFF");

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);
        expect(mars.positionHasRobotScent(new Coordinates(expectedXCoordinate, expectedYCoordinate))).to.be.true;

        const robotAfterMovement: Robot = mars.robots[0];

        expect(robotAfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robotAfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robotAfterMovement.position.orientation).to.be.equal(expectedOrientation);
        expect(robotAfterMovement.isLost).to.be.true;

        expect(actualRobotIsLost).to.be.true;

    });

    it("should set 2 robots (both not falling) and execute its instructions sequentially, keeping information correctly about Mars and Robots status", () => {
        const expectedNumberRobots: number = 2;
        const expectedNumberLostRobots: number = 0;
        const expectedNumberScentCells: number = 0;

        // Robot 1 placed at 0,0 (N). Expected final position: 2,3 (E)
        const actualRobot1IsLost: boolean = spaceStation.setRobotAndExecuteInstructions("0 0 N", "FFFRFF");

        const expectedRobot1XCoordinate: number = 2;
        const expectedRobot1YCoordinate: number = 3;
        const expectedRobot1Orientation: Orientation = orientations["E"];

        // Robot 2 placed at 0,0 (N). Expected final position: 3,3 (W)
        const actualRobot2IsLost: boolean = spaceStation.setRobotAndExecuteInstructions("5 3 E", "RFRFRFLF");

        const expectedRobot2XCoordinate: number = 3;
        const expectedRobot2YCoordinate: number = 3;
        const expectedRobot2Orientation: Orientation = orientations["W"];

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);

        const robot1AfterMovement: Robot = mars.robots[0];

        expect(robot1AfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedRobot1XCoordinate);
        expect(robot1AfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedRobot1YCoordinate);
        expect(robot1AfterMovement.position.orientation).to.be.equal(expectedRobot1Orientation);
        expect(robot1AfterMovement.isLost).to.be.false;
        expect(actualRobot1IsLost).to.be.false;

        const robot2AfterMovement: Robot = mars.robots[1];
    
        expect(robot2AfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedRobot2XCoordinate);
        expect(robot2AfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedRobot2YCoordinate);
        expect(robot2AfterMovement.position.orientation).to.be.equal(expectedRobot2Orientation);
        expect(robot2AfterMovement.isLost).to.be.false;
        expect(actualRobot2IsLost).to.be.false;
    });

    it("should set 3 robots (one will be lost falling) and execute its instructions sequentially, keeping information correctly about Mars and Robots status", () => {
        const expectedNumberRobots: number = 3;
        const expectedNumberLostRobots: number = 1;
        const expectedNumberScentCells: number = 1;
        const expectedCellWithScent: Coordinates = new Coordinates(3, 3);

        // Robot 1 placed at 1,1 (E). Expected final position: 1,1 (E)
        const actualRobot1IsLost: boolean = spaceStation.setRobotAndExecuteInstructions("1 1 E", "RFRFRFRF");

        const expectedRobot1XCoordinate: number = 1;
        const expectedRobot1YCoordinate: number = 1;
        const expectedRobot1Orientation: Orientation = orientations["E"];

        // Robot 2 placed at 3,2 (N). Expected final position: 3,3 (N) LOST
        const actualRobot2IsLost: boolean = spaceStation.setRobotAndExecuteInstructions("3 2 N", "FRRFLLFFRRFLL");

        const expectedRobot2XCoordinate: number = 3;
        const expectedRobot2YCoordinate: number = 3;
        const expectedRobot2Orientation: Orientation = orientations["N"];

        // Robot 3 placed at 0,3 (W). Expected final position: 2,3 (S)
        const actualRobot3IsLost: boolean = spaceStation.setRobotAndExecuteInstructions("0 3 W", "LLFFFLFLFL");

        const expectedRobot3XCoordinate: number = 2;
        const expectedRobot3YCoordinate: number = 3;
        const expectedRobot3Orientation: Orientation = orientations["S"];

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);
        expect(mars.positionHasRobotScent(expectedCellWithScent)).to.be.true;

        const robot1AfterMovement: Robot = mars.robots[0];

        expect(robot1AfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedRobot1XCoordinate);
        expect(robot1AfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedRobot1YCoordinate);
        expect(robot1AfterMovement.position.orientation).to.be.equal(expectedRobot1Orientation);
        expect(robot1AfterMovement.isLost).to.be.false;
        expect(actualRobot1IsLost).to.be.false;

        const robot2AfterMovement: Robot = mars.robots[1];
    
        expect(robot2AfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedRobot2XCoordinate);
        expect(robot2AfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedRobot2YCoordinate);
        expect(robot2AfterMovement.position.orientation).to.be.equal(expectedRobot2Orientation);
        expect(robot2AfterMovement.isLost).to.be.true;
        expect(actualRobot2IsLost).to.be.true;

        const robot3AfterMovement: Robot = mars.robots[2];
    
        expect(robot3AfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedRobot3XCoordinate);
        expect(robot3AfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedRobot3YCoordinate);
        expect(robot3AfterMovement.position.orientation).to.be.equal(expectedRobot3Orientation);
        expect(robot3AfterMovement.isLost).to.be.false;
        expect(actualRobot3IsLost).to.be.false;
    });

});