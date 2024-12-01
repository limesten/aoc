import * as fs from 'fs';

(() => {
    const file = fs.readFileSync('./src/day_1/input.txt', 'utf8');

    const firstNumbers: number[] = [];
    const secondNumbers = new Map<number, number>();

    const lines = file.split('\n');

    for (const line of lines) {
        const firstNumberString = line.substring(0, 5);
        const secondNumberString = line.substring(line.length - 6, line.length);
        //const firstNumberString = line[0];
        //const secondNumberString = line[line.length - 1];

        const firstNumber = parseInt(firstNumberString);
        const secondNumber = parseInt(secondNumberString);

        const occurences = secondNumbers.get(secondNumber);
        if (occurences) {
            secondNumbers.set(secondNumber, occurences + 1);
        } else {
            secondNumbers.set(secondNumber, 1);
        }

        firstNumbers.push(firstNumber);
    }

    let count = 0;
    for (const firstNumber of firstNumbers) {
        const occurences = secondNumbers.get(firstNumber);
        if (occurences) {
            count += firstNumber * occurences;
        }
    }
    console.log(count);
})();
