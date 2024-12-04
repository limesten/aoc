import * as fs from 'fs';

(() => {
    const input = fs.readFileSync('./src/day_4/input.txt', 'utf8');
    const lines = input.split('\n');

    let xmasCount = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] == 'X') {
                // look left
                if (j > 2) {
                    if (lines[i][j - 1] == 'M') {
                        if (lines[i][j - 2] == 'A') {
                            if (lines[i][j - 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look up
                if (i > 2) {
                    if (lines[i - 1][j] == 'M') {
                        if (lines[i - 2][j] == 'A') {
                            if (lines[i - 3][j] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look right
                if (j < lines[i].length - 3) {
                    if (lines[i][j + 1] == 'M') {
                        if (lines[i][j + 2] == 'A') {
                            if (lines[i][j + 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look down
                if (i < lines.length - 3) {
                    if (lines[i + 1][j] == 'M') {
                        if (lines[i + 2][j] == 'A') {
                            if (lines[i + 3][j] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look diagonal up-left
                if (i > 2 && j > 2) {
                    if (lines[i - 1][j - 1] == 'M') {
                        if (lines[i - 2][j - 2] == 'A') {
                            if (lines[i - 3][j - 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look diagonal up-right
                if (i > 2 && j < lines[i].length - 3) {
                    if (lines[i - 1][j + 1] == 'M') {
                        if (lines[i - 2][j + 2] == 'A') {
                            if (lines[i - 3][j + 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look diagonal down-right
                if (i < lines.length - 3 && j < lines[i].length - 3) {
                    if (lines[i + 1][j + 1] == 'M') {
                        if (lines[i + 2][j + 2] == 'A') {
                            if (lines[i + 3][j + 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }

                // look diagonal down-left
                if (i < lines.length - 3 && j > 2) {
                    if (lines[i + 1][j - 1] == 'M') {
                        if (lines[i + 2][j - 2] == 'A') {
                            if (lines[i + 3][j - 3] == 'S') {
                                xmasCount += 1;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(xmasCount);
})();
