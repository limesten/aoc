import * as fs from 'fs';

(() => {
    const file = fs.readFileSync('./src/day_1/input.txt', 'utf8');
    const listOne: number[] = [];
    const listTwo: number[] = [];

    const lines = file.split('\n');

    for (const line of lines) {
        const firstNumberString = line.substring(0, 5);
        const secondNumberString = line.substring(line.length - 6, line.length);

        const firstNumber = parseInt(firstNumberString);
        const secondNumber = parseInt(secondNumberString);

        listOne.push(firstNumber);
        listTwo.push(secondNumber);
    }

    const listOneSorted = listOne.sort((a, b) => a - b);
    const listTwoSorted = listTwo.sort((a, b) => a - b);

    if (listOneSorted.length != listTwoSorted.length) {
        console.log('Different list length');
        return;
    }

    let count = 0;
    for (const i in listOneSorted) {
        const diff = Math.abs(listOneSorted[i] - listTwoSorted[i]);
        count += diff;
    }

    console.log(count);
})();
