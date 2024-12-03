import * as fs from 'fs';

(() => {
    let input = fs.readFileSync('./src/day_3/input.txt', 'utf8');
    //input = input.substring(0, 100);
    //let input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

    let sum = 0;
    while (true) {
        const mulIdx = input.indexOf('mul(');
        if (mulIdx == -1) {
            console.log('no more mul found');
            break;
        }
        input = input.substring(mulIdx, input.length);
        //console.log(input);
        const y = input.indexOf(')');
        if (y == -1) {
            console.log('no more ) found');
            break;
        }
        const x = 1;
        //console.log(`x: ${x}`);
        //console.log(`y: ${y}`);
        const digitStart = x + 3;
        const digitEnd = y - 1;
        //console.log(input[digitStart]);
        //console.log(input[digitEnd]);
        const digitsString = input.substring(digitStart, digitEnd + 1);

        console.log(`testing: ${digitsString}`);
        let cont = true;
        for (const char of digitsString) {
            if (char == ',') {
                continue;
            }
            if (Number.isNaN(parseInt(char))) {
                cont = false;
                break;
            }
        }
        if (cont == false) {
            input = input.substring(digitStart, input.length);
            continue;
        }

        const digits = digitsString.split(',');
        const a = digits[0];
        const b = digits[1];

        const num_a = parseInt(a);
        const num_b = parseInt(b);

        if (Number.isNaN(num_a) || Number.isNaN(num_b)) {
            console.log('NaN, big fiasko');
            break;
        }

        const product = num_a * num_b;
        console.log(product);
        console.log('========');
        sum += product;

        input = input.substring(y + 1, input.length);
    }
    console.log(`total: ${sum}`);
})();
