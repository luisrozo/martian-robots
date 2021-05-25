import { Mars } from "../src/mars";
import { expect } from 'chai';
import 'mocha';
import { Robot } from "../src/robot";
import { Coordinates } from "../src/robotPosition/coordinates";
import { Orientation } from "../src/robotPosition/orientation";
import { Position } from "../src/robotPosition/position";
import { orientations } from "../src/constants";

describe("test mars", () => {

    const marsWidth: number = 5;
    const marsHeight: number = 3;

    let mars: Mars;

    const numberOfRobots: number = 3;
    let robots: Robot[];

    let initialCoordinates: Coordinates[] = [
        new Coordinates(0, 0),
        new Coordinates(2, 2),
        new Coordinates(4, 0),
    ];
    let initialOrientations: Orientation[] = [
        orientations["N"],
        orientations["S"],
        orientations["E"],
    ];

    beforeEach(() => {
        robots = [];

        for(let i = 0; i < numberOfRobots; i++) {
            robots.push(new Robot(new Position(initialCoordinates[i], initialOrientations[i])));
        }

        mars = new Mars(marsWidth, marsHeight);

    });

    it("should create Mars correctly", () => {

        const expectedMarsWidth: number = 5;
        const expectedMarsHeight: number = 3;

        expect(mars.width).to.equal(expectedMarsWidth);
        expect(mars.height).to.equal(expectedMarsHeight);
        expect(mars.robots).to.be.instanceOf(Array);
        expect(mars.robots).to.have.length(0);
        expect(mars.lostRobots).to.equal(0);
        expect(mars.positionsWithRobotScent).to.be.instanceOf(Array);
        expect(mars.positionsWithRobotScent).to.have.length(0);

    });

    it("should add one robot to the planet", () => {
        const initialRobots: number = 0;
        const expectedRobots: number = 1;

        expect(mars.robots).to.have.length(initialRobots);

        mars.addRobot(robots[0]);

        expect(mars.robots).to.have.length(expectedRobots);

    });

    it("should increment one lost robot on planet", () => {
        const initialLostRobots: number = 0;
        const expectedLostRobots: number = 1;

        expect(mars.lostRobots).to.equal(initialLostRobots);

        mars.incrementLostRobots();

        expect(mars.lostRobots).to.equal(expectedLostRobots);
    });

    it("should save a new position with robot scent", () => {
        const initialCellsWithScent: number = 0;
        const expectedCellsWithScent: number = 1;

        const newCoordinatesWithScent: Coordinates = new Coordinates(0, 2);

        expect(mars.positionsWithRobotScent).to.have.length(initialCellsWithScent);

        mars.setNewPositionWithRobotScent(newCoordinatesWithScent);

        expect(mars.positionsWithRobotScent).to.have.length(expectedCellsWithScent);
    });

    it("should say that position with robot scent actually has robot scent", () => {
        const coordinates: Coordinates = new Coordinates(0, 2);

        expect(mars.positionHasRobotScent(coordinates)).to.be.false;

        mars.setNewPositionWithRobotScent(coordinates);

        expect(mars.positionHasRobotScent(coordinates)).to.be.true;
    });
    
});