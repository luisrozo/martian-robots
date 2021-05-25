import { expect } from 'chai';
import 'mocha';
import { orientations } from '../../src/constants';
import { Coordinates } from '../../src/robotPosition/coordinates';
import { Orientation } from '../../src/robotPosition/orientation';
import { Position } from '../../src/robotPosition/position';

describe("test position", () => {

    const initialXCoordinate: number = 2;
    const initialYCoordinate: number = 3;
    const initialOrientation: string = "N";

    let coordinates: Coordinates;
    let orientation: Orientation;

    before(() => {
        coordinates = new Coordinates(initialXCoordinate, initialYCoordinate);
        orientation = orientations[initialOrientation];
    });

    it("should create the position correctly", () => {

        const expectedXCoordinate: number = 2;
        const expectedYCoordinate: number = 3;
        const expectedOrientation: Orientation = Orientation.N;

        const position: Position = new Position(coordinates, orientation);

        expect(position.coordinates.xCoordinate).to.be.equal(expectedXCoordinate);
        expect(position.coordinates.yCoordinate).to.be.equal(expectedYCoordinate);
        expect(position.orientation).to.be.equal(expectedOrientation);

    });
});