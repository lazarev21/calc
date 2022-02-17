const container = document.querySelector('.container')
const result = document.querySelector('.resultLog')
const actions = document.querySelector('.actionsLog')

let arrayOfClicks = [] //массив для записи истории кликов и дальнеших рассчетов
let strOfClicksOnStep = '' //строка для записи кликов на текущем шаге

container.addEventListener('click', function (event)  {
    let target = event.target;

    if (target.closest('.btn-value')) { //
        if (strOfClicksOnStep.length < 6) { // ограничиваем количество символов для ввода
        strOfClicksOnStep += target.innerHTML; //прибавляем значение от пользователя в строку 
        arrayOfClicks.push(target.innerHTML); //прибавляем значения в наш массив
        result.innerHTML = strOfClicksOnStep; //показываем текущие значения пользователю
        }
    }

    if (target.closest('.btn-action')) {
        arrayOfClicks.push(target.innerHTML) //добавляем дейсвтие в наш массив
        actions.innerHTML = arrayOfClicks.join('') //выводим историю дейсвтий
        strOfClicksOnStep = ''; //обнуялем строку на текущем шаге
    }

    if (target.closest('.btn-backspace')) {
        let strOfResult = result.innerHTML
        //проверяем длину строки, чтобы не стирать ее до конца, а заменить на 0
        if (strOfResult.length === 1) { 
            result.innerHTML = 0;
            strOfClicksOnStep = '';
            arrayOfClicks.splice(-1,1);
        }
        
        if (strOfResult.length > 1) {
            strOfClicksOnStep = strOfResult.slice(0,-1);
            result.innerHTML = strOfClicksOnStep
            arrayOfClicks.splice(-1,1);
        }
    }

    if (target.closest('.btn-clear')) { 
        arrayOfClicks = []; //обнуляем массив
        strOfClicksOnStep = ''; //обнуляем строку
        actions.innerHTML = '0'; //обнуляем историю действий
        result.innerHTML = '0'; //обнуляем результат
        result.style['font-size'] = "96px" //возвращем размер по умолчанию
    }

    if (target.closest('.btn-result')) {
        let strResultLog = String(argumentsForCalc())//вводим строку результат рассчетов
        if (strResultLog.length > 6) { //меняем размер шрифта, если результат слишком длинный
            result.style['font-size'] = "48px"
            result.innerHTML = strResultLog;
        }   
        else {
            result.innerHTML = strResultLog;
        }
    }

})  

function argumentsForCalc() {
    const operationsFromUi = { //объект для поиска дейсвтия, на которое кликнул пользователь
        '+': 'sum',
        '–': 'sub',
        '÷': 'div',
        '×': 'mult',
    }

    for (let i = 0; i <arrayOfClicks.length; i++) { //перебираем каждый элемент строки, пока не найдем действие
        if (arrayOfClicks[i] in operationsFromUi) { 
            // когжа нашли дейсвтие делим записываем значения a,b ДО и После дейсвтия соотвественно
            a = +(arrayOfClicks.slice([0], [i]).join(''));
            b = +(arrayOfClicks.slice([i+1], [arrayOfClicks.length-1]).join(''))
            operation = operationsFromUi[arrayOfClicks[i]]; //оператор для фукнции Calc
            return +(Calc(operation,a,b).toFixed(5)) //проводим рассчет сократив до 5 знаков после запятой
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




    /* if (event.target.closest('.btn-value') || event.target.closest('.btn-action')) {
        
        arrayOfClicks+=target.innerHTML; //добавялем в строку значения, который накликал пользователь
        actions.innerHTML = arrayOfClicks;  //выводим в историю дейсвтий
        
        function clickUI () {
            event.target.style['opacity'] = "0.7";
        }
        function clickUIBack () {
            event.target.style['opacity'] = "1";
        }
        
        setTimeout (clickUI);
        setTimeout (clickUIBack,100);
    } */