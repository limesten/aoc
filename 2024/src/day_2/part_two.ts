import * as fs from 'fs';

function checkSafeness(levels: string[]) {
    // 1 for increasing, 0 for decreasing
    let direction = 1;
    let safe: boolean = true;

    for (let i = 0; i < levels.length; i++) {
        if (i == 0) {
            continue;
        }

        const currentValue = parseInt(levels[i]);
        const previousValue = parseInt(levels[i - 1]);
        const diff = Math.abs(currentValue - previousValue);
        if (diff < 1 || diff > 3) {
            safe = false;
            break;
        }

        if (i == 1) {
            if (currentValue > previousValue) {
                direction = 1;
            } else {
                direction = 0;
            }
            continue;
        }

        if (currentValue > previousValue) {
            if (direction == 0) {
                safe = false;
                break;
            }
        }
        if (currentValue < previousValue) {
            if (direction == 1) {
                safe = false;
                break;
            }
        }
    }
    return safe;
}

(() => {
    const file = fs.readFileSync('./src/day_2/input.txt', 'utf8');

    const reports = file.split('\n');

    let safeReports = 0;
    for (const report of reports) {
        const levels = report.split(' ');
        const safe = checkSafeness(levels);
        if (safe) {
            safeReports += 1;
            continue;
        }

        for (let i = 0; i < levels.length; i++) {
            const levelsCopy = Array.from(levels);
            levelsCopy.splice(i, 1);

            const safe = checkSafeness(levelsCopy);
            if (safe) {
                safeReports += 1;
                break;
            }
        }
    }
    console.log(safeReports);
})();
