import * as fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const lines = input.split('\n');

let rows = [];
for (const row of lines) {
    const characters = row.split('');
    rows.push(characters);
}

function walk(rows, startPosition) {
    let loopFound = false;
    let visitedStates = new Set();
    let position = startPosition;
    let direction = 'up';
    while (true) {
        const [y, x] = position;

        if (y >= rows.length - 1 || y <= 0 || x >= rows[y].length - 1 || x <= 0) {
            console.log(`outside of map`);
            return;
        }

        const guardState = `${y},${x},${direction}`;
        if (visitedStates.has(guardState)) {
            console.log('Found loop');
            loopFound = true;
            break;
        } else {
            visitedStates.add(guardState);
        }

        if (direction == 'up') {
            if (rows[y - 1][x] != '#') {
                position = [y - 1, x];
            } else {
                direction = 'right';
            }
            continue;
        }
        if (direction == 'right') {
            if (rows[y][x + 1] != '#') {
                position = [y, x + 1];
            } else {
                direction = 'down';
            }
            continue;
        }
        if (direction == 'down') {
            if (rows[y + 1][x] != '#') {
                position = [y + 1, x];
            } else {
                direction = 'left';
            }
            continue;
        }
        if (direction == 'left') {
            if (rows[y][x - 1] != '#') {
                position = [y, x - 1];
            } else {
                direction = 'up';
            }
            continue;
        }
    }
    return loopFound;
}

let startPosition;
for (let i = 0; i < rows.length; i++) {
    const guard = '^';
    if (rows[i].includes(guard)) {
        startPosition = [i, rows[i].indexOf(guard)];
    }
}

let loopPositions = 0;

const rowLength = rows.length;
const colLength = rows[0].length;
const totalLoops = rowLength * colLength;

console.log(`Total loops will be ${totalLoops}`);

const startTime = new Date();
let loopCounter = 0;
for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        loopCounter += 1;
        console.log(`On loop ${loopCounter} of ${totalLoops}`);
        if (rows[i][j] == '#' || rows[i][j] == '^') {
            continue;
        }

        let rowsCopy = rows.map((row) => [...row]);
        rowsCopy[i][j] = '#';

        const loopFound = walk(rowsCopy, startPosition);
        if (loopFound) {
            loopPositions += 1;
        }
    }
}
console.log(`Loop positions: ${loopPositions}`);
const finishTime = new Date();

const elapsedMs = finishTime - startTime;
const elapsedSeconds = elapsedMs / 1000;
console.log(`It took ${elapsedSeconds} seconds`);
