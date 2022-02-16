const container = document.querySelector('.container')
const result = document.querySelector('.resultLog')
const actions = document.querySelector('.actionsLog')
let arrayOfClicks = []
let strOfClicksOnStep = ''

container.addEventListener('click', function (event)  {
    let target = event.target;

    if (event.target.closest('.btn-value')) {
        strOfClicksOnStep += target.innerHTML;
        arrayOfClicks.push(target.innerHTML); //прибавляем в масситв значения, которые накликал пользователь в данном действие
        result.innerHTML = strOfClicksOnStep;
    }
    
    if (event.target.closest('.btn-backspace')) {
        let strOfResult = result.innerHTML
        
        if (strOfResult.length === 1) { //чтобы совсем не стирать историю оставляем значение 0 
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
    if (event.target.closest('.btn-action')) {
        arrayOfClicks.push(target.innerHTML)
        actions.innerHTML = arrayOfClicks.join('')//выводим историю дейсвтий
        strOfClicksOnStep = '';
       
    }


    if (event.target.closest('.btn-result')) {
        let strResultLog = argumentsForCalc()   
        if (strResultLog.length > 5) { //меняем размер шрифта, если результат слишком длинный
            result.style['font-size'] = "48px"
            result.innerHTML = strResultLog;
        }   
        else {
            result.innerHTML = strResultLog;
        }
    }

    if (event.target.closest('.btn-clear')) { 
        arrayOfClicks = []; //обнуляем строку
        strOfClicksOnStep = '';
        actions.innerHTML = '0'; //обнуляем историю действий
        result.innerHTML = '0'; //обнуляем результат
        result.style['font-size'] = "96px" //возвращем размер по умолчанию
    }


})  

function argumentsForCalc() {

    const operationsFromUi = {
        '+': 'sum',
        '–': 'sub',
        '÷': 'div',
        '×': 'mult',
    }

    for (let i = 0; i <arrayOfClicks.length; i++) { //перебираем каждый элемент строки, пока не найдем действие
        if (arrayOfClicks[i] in operationsFromUi) {
            a = +(arrayOfClicks.slice([0], [i]).join(''));
            b = +(arrayOfClicks.slice([i+1], [arrayOfClicks.length-1]).join(''))
            operation = operationsFromUi[arrayOfClicks[i]];
            return Calc(operation,a,b)
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