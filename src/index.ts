import { Mars } from "./mars";
import { SpaceStation } from "./spaceStation";

const sampleInput: string[] = [
    '5 3',
    '1 1 E',
    'RFRFRFRF',
    '3 2 N',
    'FRRFLLFFRRFLL',
    '0 3 W',
    'LLFFFLFLFL'
];

let mars: Mars;

const planetSize = sampleInput.shift();

if(planetSize) {
    const [ marsWidth, marsHeight ] = planetSize.split(' ');
    mars = new Mars(Number(marsWidth) + 1, Number(marsHeight) + 1);

    const spaceStation: SpaceStation = new SpaceStation(mars);
    spaceStation.setRobotsAndExecuteInstructions(sampleInput);
} else {
    mars = Object();
}

mars.robots.forEach(robot => {
    console.log(robot.toString());
});

/*console.log("MARS FINAL STATUS")
console.log("Lost robots: " + mars.lostRobots);
console.log("Positions with scent: " + mars.positionsWithRobotScent[0].xCoordinate + ' ' + mars.positionsWithRobotScent[0].yCoordinate);*/