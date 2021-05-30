import * as fs from 'fs';
import { PATH_TO_INPUT_FILE, REGEXP_PLANET_SIZE } from "./constants";
import { preprocessInputAndSendInformation, saveMars, saveRobots } from "./helpers";
import { Mars } from "./mars";
import { SpaceStation } from "./spaceStation";

const inputInfo: string[] = fs.readFileSync(PATH_TO_INPUT_FILE).toString().split("\n");

let mars: Mars;

const planetSize: string | undefined = inputInfo.shift();

// Check if input is empty
if(planetSize) {

    const regExpPlanetSize: RegExp = new RegExp(REGEXP_PLANET_SIZE);

    // Check if planet coordinates are properly described in file
    if(regExpPlanetSize.test(planetSize)) {

        // Check if the rest of the information is properly formatted
        if(inputInfo.length && (inputInfo.length % 2 == 0)) {

            const [ marsUpperRightXCoordinate, marsUpperRightYCoordinate ] = planetSize.split(' ');

            const marsWidth: number = (Number(marsUpperRightXCoordinate) > 50 || Number(marsUpperRightXCoordinate) < 1) ? 51 : Number(marsUpperRightXCoordinate) + 1;
            const marsHeight: number = (Number(marsUpperRightYCoordinate) > 50 || Number(marsUpperRightYCoordinate) < 1) ? 51 : Number(marsUpperRightYCoordinate) + 1;

            console.log("Found Mars planet of dimensions " + marsWidth + "x" + marsHeight);

            mars = new Mars(marsWidth, marsHeight);

            const spaceStation: SpaceStation = new SpaceStation(mars);

            // Preprocess input line by line, in order to clean information up and send it properly formatted to SpaceStation class
            preprocessInputAndSendInformation(spaceStation, inputInfo, marsWidth, marsHeight);

            // Show output info in console
            spaceStation.showPlanetInfo();

            // Save robots info to output file and db
            saveRobots(mars.robots);

            // Save Mars info to db
            saveMars(mars);

        } else {
            console.error("FORMAT ERROR: Mars info must include two lines of information for each robot (one for position and another for instructions).");
        }

    } else {
        console.error("FORMAT ERROR: Input file must include, in the first line, the planet size with the format \"width height\" (values from 1 to 50).");
    }

} else {
    console.log("FILE CONTENT ERROR: file must contain information about Mars width and height.");
}
