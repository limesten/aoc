import * as fs from 'fs';

(() => {
    const input = fs.readFileSync('./src/day_5/input.txt', 'utf8');
    const lines = input.split('\n');
    const rules = lines.slice(0, lines.indexOf(''));
    const instructions = lines.slice(lines.indexOf('') + 1, lines.length);

    const ruleMap: { [key: string]: string[] } = {};
    for (const rule of rules) {
        const split = rule.split('|');
        const key = split[0];
        const val = split[1];

        if (ruleMap[key]) {
            ruleMap[key].push(val);
        } else {
            ruleMap[key] = [val];
        }
    }

    const invalidInstructions: string[][] = [];
    let sum = 0;
    for (const instr of instructions) {
        const values = instr.split(',');
        let valid = true;
        //console.log(`testing: ${values}`);
        for (let i = 0; i < values.length; i++) {
            if (!valid) {
                break;
            }
            if (i == 0) {
                continue;
            }
            if (values[i] in ruleMap) {
                //console.log(`${values[i]} is in ruleMap`);
                for (let j = i - 1; j >= 0; j--) {
                    //console.log(`checking previous value: ${values[j]}`);
                    if (ruleMap[values[i]].includes(values[j])) {
                        valid = false;
                        console.log(`found invalid instruction: ${values}`);
                        invalidInstructions.push(values);
                        break;
                    }
                }
            }
        }
        //console.log(`Valid: ${valid} for line ${instr}`);
        if (valid) {
            const middleIdx = Math.ceil(values.length / 2 - 1);
            const middleNumStr = values[middleIdx];
            const middleNum = parseInt(middleNumStr);
            sum += middleNum;
        }
    }
    console.log(invalidInstructions);

    console.log(ruleMap);
    let correctedSum = 0;
    for (const vals of invalidInstructions) {
        console.log(`Doing instr: ${vals}`);
        for (let i = 1; i < vals.length; i++) {
            for (let j = 0; j < vals.length - 1; j++) {
                if (vals[i] in ruleMap) {
                    if (ruleMap[vals[i]].includes(vals[j])) {
                        const temp = vals[i];
                        vals[i] = vals[j];
                        vals[j] = temp;
                    }
                }
            }
        }
        console.log(`After sort: ${vals}`);
        const middleIdx = Math.ceil(vals.length / 2 - 1);
        const middleNumStr = vals[middleIdx];
        const middleNum = parseInt(middleNumStr);
        correctedSum += middleNum;
    }
    console.log(correctedSum);
})();
