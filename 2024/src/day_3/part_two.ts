import * as fs from 'fs';

(() => {
    let input = fs.readFileSync('./src/day_3/input.txt', 'utf8');

    let sum = 0;
    while (true) {
        const dontIdx = input.indexOf(`don't()`);
        const mulIdx = input.indexOf('mul(');
        if (mulIdx == -1) {
            console.log('no more mul found');
            break;
        }

        if (dontIdx < mulIdx && dontIdx >= 0) {
            // We found a dont() before next mul() and therefore we
            // remove everything until the next do()
            input = input.substring(dontIdx + 7);
            const doIdx = input.indexOf('do()');
            if (doIdx == -1) {
                console.log('no more do() found');
                break;
            }
            input = input.substring(doIdx, input.length);
            continue;
        }

        // Get everything between the parenthesis of mul()
        input = input.substring(mulIdx, input.length);
        const y = input.indexOf(')');
        if (y == -1) {
            console.log('no more ) found');
            break;
        }
        const x = 1;
        const digitStart = x + 3;
        const digitEnd = y - 1;
        const digitsString = input.substring(digitStart, digitEnd + 1);

        // Then check if they are all numbers (except for comma)
        // Should probably check so there isnt more than 1 comma but didnt see that in the input
        let valid = true;
        for (const char of digitsString) {
            if (char == ',') {
                continue;
            }
            if (Number.isNaN(parseInt(char))) {
                valid = false;
                break;
            }
        }
        if (valid == false) {
            input = input.substring(digitStart, input.length);
            continue;
        }

        const digits = digitsString.split(',');
        const a = digits[0];
        const b = digits[1];

        const num_a = parseInt(a);
        const num_b = parseInt(b);

        if (Number.isNaN(num_a) || Number.isNaN(num_b)) {
            console.log('got a NaN, big fiasko');
            break;
        }

        const product = num_a * num_b;
        sum += product;

        input = input.substring(y + 1, input.length);
    }
    console.log(`total: ${sum}`);
})();
