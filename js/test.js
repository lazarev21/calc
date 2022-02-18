arrayOfClicks = [8,'–',8]
function checkArgumentsForCalc(arrayOfClicks) {
    const operationsFromUi = { //объект для поиска дейсвтия, на которое кликнул пользователь
        '+': 'sum',
        '–': 'sub',
        '÷': 'div',
        '×': 'mult',
    }

    for (let i = 0; i <arrayOfClicks.length; i++) { //перебираем каждый элемент строки, пока не найдем действие
        if (arrayOfClicks[i] in operationsFromUi) { 
            // когжа нашли дейсвтие делим записываем значения a,b ДО и ПОСЛЕ дейсвтия соотвественно
            a = +(arrayOfClicks.slice([0], [i]).join(''));
            b = +(arrayOfClicks.slice([i+1], [arrayOfClicks.length]).join(''))
            operation = operationsFromUi[arrayOfClicks[i]]; //оператор для фукнции Calc
            if (b == 0) {
                b = a;
            if (operation == 0) {
                b = 0
                operation = "+"
            }
            }
            console.log(a)
            console.log(operation)
            console.log(a)
            
            if ((a != '') & (b != '') & (operation != '')) {
                return(Calc(operation, a, b))
            }
        }
    }
}


function Calc (operation, a, b) {
    const isNotValid = isNaN(a) || isNaN(b);
    const operations = {
        sum: a+b,
        sub: a-b,
        div: a/b,
        mult: a*b,
    }
    if (isNotValid) {
        return ('error');
    }
    else {
        if (operation in operations) {
            return( operations[operation])
        }
        else {
            return ('Unknown operation')
        }

}
}

if (checkArgumentsForCalc(arrayOfClicks)) {
console.log(checkArgumentsForCalc(arrayOfClicks))}


/* 
let a = '123';
let b  = '1';
let operation = '+';

if ((a != '') & (b != '')  & (operation != '')) { console.log('123')} */