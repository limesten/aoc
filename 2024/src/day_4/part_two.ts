import * as fs from 'fs';

(() => {
    const input = fs.readFileSync('./src/day_4/input.txt', 'utf8');
    const lines = input.split('\n');

    let xmasCount = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] == 'A') {
                if (i > 0 && j > 0 && i < lines.length - 1 && j < lines[i].length - 1) {
                    let masCount = 0;

                    // look diagonal up left to down right
                    if (lines[i - 1][j - 1] == 'M') {
                        if (lines[i + 1][j + 1] == 'S') {
                            masCount += 1;
                        }
                    }

                    // look diagonal down right to up left
                    if (lines[i + 1][j + 1] == 'M') {
                        if (lines[i - 1][j - 1] == 'S') {
                            masCount += 1;
                        }
                    }

                    // look diagonal up right to down left
                    if (lines[i - 1][j + 1] == 'M') {
                        if (lines[i + 1][j - 1] == 'S') {
                            masCount += 1;
                        }
                    }

                    // look diagonal down left to up right
                    if (lines[i + 1][j - 1] == 'M') {
                        if (lines[i - 1][j + 1] == 'S') {
                            masCount += 1;
                        }
                    }

                    if (masCount >= 2) {
                        xmasCount += 1;
                    }
                }
            }
        }
    }
    console.log(xmasCount);
})();
