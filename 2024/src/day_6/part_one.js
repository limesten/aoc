import * as fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const rows = input.split('\n');

let startPosition;
for (let i = 0; i < rows.length; i++) {
    const guard = '^';
    if (rows[i].includes(guard)) {
        startPosition = [i, rows[i].indexOf(guard)];
    }
}

let visited = [];
let direction = 'up';
visited.push(startPosition);
try {
    while (true) {
        const lastPosition = visited[visited.length - 1];
        const y = lastPosition[0];
        const x = lastPosition[1];

        if (direction == 'up') {
            if (rows[y - 1][x] != '#') {
                visited.push([y - 1, x]);
            } else {
                direction = 'right';
            }
            continue;
        }
        if (direction == 'right') {
            if (rows[y][x + 1] != '#') {
                visited.push([y, x + 1]);
            } else {
                direction = 'down';
            }
            continue;
        }
        if (direction == 'down') {
            if (rows[y + 1][x] != '#') {
                visited.push([y + 1, x]);
            } else {
                direction = 'left';
            }
            continue;
        }
        if (direction == 'left') {
            if (rows[y][x - 1] != '#') {
                visited.push([y, x - 1]);
            } else {
                direction = 'up';
            }
            continue;
        }
    }
} catch {
    console.log(visited[visited.length - 1]);
    console.log(visited.length);

    const seen = new Set();
    for (const location of visited) {
        const lala = JSON.stringify(location);
        seen.add(lala);
    }

    console.log(seen.size);
}
