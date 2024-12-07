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

    let sum = 0;
    for (const instr of instructions) {
        const values = instr.split(',');
        let valid = true;
        //console.log(`testing: ${values}`);
        for (let i = 0; i < values.length; i++) {
            if (i == 0) {
                continue;
            }
            if (values[i] in ruleMap) {
                //console.log(`${values[i]} is in ruleMap`);
                for (let j = i - 1; j >= 0; j--) {
                    //console.log(`checking previous value: ${values[j]}`);
                    if (ruleMap[values[i]].includes(values[j])) {
                        valid = false;
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
    console.log(sum);
})();
