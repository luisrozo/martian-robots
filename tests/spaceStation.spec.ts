import { Mars } from "../src/mars";
import { expect } from 'chai';
import 'mocha';
import { Robot } from "../src/robot";
import { Coordinates } from "../src/robotPosition/coordinates";
import { Orientation } from "../src/robotPosition/orientation";
import { Position } from "../src/robotPosition/position";
import { orientations } from "../src/constants";
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

        /**
         * Robot placed at 0,0 (N). Expected final position: 2,0 (S)
         */
        const robotsInput: string[] = [
            "0 0 N",
            "LLLFFR",
        ];

        spaceStation.setRobotsAndExecuteInstructions(robotsInput);

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);

        const robotAfterMovement: Robot = mars.robots[0];

        expect(robotAfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robotAfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robotAfterMovement.position.orientation).to.be.equal(expectedOrientation);
        expect(robotAfterMovement.isLost).to.be.false;

    });

    it("should set 1 robot (falling) and execute its instructions, keeping information correctly about Mars and Robot status", () => {

        const expectedNumberRobots: number = 1;
        const expectedNumberLostRobots: number = 1;
        const expectedNumberScentCells: number = 1;

        const expectedXCoordinate: number = 5;
        const expectedYCoordinate: number = 0;
        const expectedOrientation: Orientation = orientations["E"];

        /**
         * Robot placed at 0,0 (N). Expected final position: 2,0 (S)
         */
        const robotsInput: string[] = [
            "3 0 N",
            "RFFF",
        ];

        spaceStation.setRobotsAndExecuteInstructions(robotsInput);

        expect(mars.robots).to.have.length(expectedNumberRobots);
        expect(mars.lostRobots).to.equal(expectedNumberLostRobots);
        expect(mars.positionsWithRobotScent).to.have.length(expectedNumberScentCells);
        expect(mars.positionHasRobotScent(new Coordinates(expectedXCoordinate, expectedYCoordinate))).to.be.true;

        const robotAfterMovement: Robot = mars.robots[0];

        expect(robotAfterMovement.position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(robotAfterMovement.position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(robotAfterMovement.position.orientation).to.be.equal(expectedOrientation);
        expect(robotAfterMovement.isLost).to.be.true;

    });

});