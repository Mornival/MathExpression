// calc('2 / (2 + 3) * 4.33 - -6');
// calc('2 + 5 / 5 * 5 - -6');
// calc('2 /2+3 * 4.75- -6');
//calc('-123');
//calc('4 + -(11 + 3) +-(1 + 2)');
// calc('12*-1');
calc('(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)'); 
// тут ответ 1
function calc(expression) {
    console.log(expression);
    let mathExp = [];
    let j = -1;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] != '/' && expression[i] != '*' && expression[i] != '-' && expression[i] != '+' && expression[i] != '(' && expression[i] != ')' && expression[i] != ' ') {
            if (typeof mathExp[j] == 'number' && expression[i] != '.') {
                mathExp[j] += expression[i];
                mathExp[j] = parseFloat(mathExp[j]);
            }
            else if (expression[i] != '.') {
                mathExp.push(+expression[i]);
                j++;
            }
            else if (expression[i] == '.') {
                mathExp[j] += expression[i];
                i++;
                mathExp[j] += expression[i];
                mathExp[j] = parseFloat(mathExp[j]);
            }
        }
        else if (expression[i] == '/' || expression[i] == '*' || expression[i] == '-' || expression[i] == '+' || expression[i] == '(' || expression[i] == ')') {
            if (mathExp[j] == '-' && expression[i] == '-') {
                mathExp.pop();
                mathExp.push('+')
            }
            else if (typeof mathExp[j] != 'number' && expression[i] == '-') {
                mathExp.push(expression[i]);
                j+=2;
                i++;
                let nkvd = +expression[i];
                if (typeof expression[i] == 'number') {
                    mathExp[j] += expression[i];
                    mathExp[j] = +mathExp[j];
                }
                else if(typeof expression[i] != 'number'){
                    mathExp.push(expression[i]);
                }
                else if(typeof nkvd == 'number'){
                    mathExp.push(nkvd);
                }
            }
            else {
                mathExp.push(expression[i]);
                j++;
            }
        }
    }
    console.log(mathExp);
    for (let i = 0; i < mathExp.length; i++) {
        if (mathExp[i] == '(') {
            let res = 0;
            mathExp[i] = '';
            i++;
            let vlozh = 1;
            let s = '';
            while (vlozh != 0) {
                if (mathExp[i] == '(') {
                    vlozh++;
                }
                else if (mathExp[i] == ')') {
                    vlozh--;
                }
                if (vlozh != 0) {
                    s += mathExp[i];
                    mathExp[i] = '';
                    i++;
                }
            }
            res += calc(s);
            mathExp[i] = res;
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
    }
    for(let i = 0; i < mathExp.length; i++){
        if(mathExp[i] == '-' && typeof mathExp[i - 1] != 'number'){
            mathExp[i + 1] = mathExp[i + 1] * -1;
            mathExp[i] = '';
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
    }
    for(let i = 0;i < mathExp.length; i++){
        if(typeof mathExp[i] == 'number' && typeof mathExp[i + 1] == 'number'){
            let s = '';
            s+= mathExp[i];
            s+=mathExp[i+1];
            mathExp[i] = +s;
            mathExp[i + 1] = '';
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
    }
    let len = mathExp.length;
    for (let i1 = 0; i1 < len; i1++) {
        if (mathExp[i1] != '' && mathExp[i1]!= ' ') {
            mathExp.push(mathExp[i1]);
        }
    }
    console.log(mathExp);
    for (let i1 = 0; i1 < len; i1++) {
        mathExp.shift();
    }
    console.log(mathExp);
    for (let i = 0; i < mathExp.length; i++) {
        if (mathExp[i] == '/') {
            let s = mathExp[i - 1] / mathExp[i + 1];
            mathExp[i - 1] = '';
            mathExp[i + 1] = '';
            mathExp[i] = s;
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
        if (mathExp[i] == '*') {
            let s = mathExp[i - 1] * mathExp[i + 1];
            mathExp[i - 1] = '';
            mathExp[i + 1] = '';
            mathExp[i] = s;
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
    }
    for (let i = 0; i < mathExp.length; i++) {
        if (mathExp[i] == '+') {
            let s = mathExp[i - 1] + mathExp[i + 1];
            mathExp[i - 1] = '';
            mathExp[i + 1] = '';
            mathExp[i] = s;
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
        if (mathExp[i] == '-' && i > 0) {
            let s = mathExp[i - 1] - mathExp[i + 1];
            mathExp[i - 1] = '';
            mathExp[i + 1] = '';
            mathExp[i] = s;
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '' || mathExp[i1] == '0') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
        else if (mathExp[i] == '-') {
            mathExp[i] += mathExp[i + 1];
            mathExp[i + 1] = '';
            let len = mathExp.length;
            for (let i1 = 0; i1 < len; i1++) {
                if (mathExp[i1] != '' || mathExp[i1] == '0') {
                    mathExp.push(mathExp[i1]);
                }
            }
            for (let i1 = 0; i1 < len; i1++) {
                mathExp.shift();
            }
            i = 0;
        }
    }
    let result = 0;
    console.log(mathExp);
    result = +mathExp[0];
    console.log(result);
    return result;
};