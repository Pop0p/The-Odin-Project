const numbers = document.querySelectorAll(".btn[data-number]");
const operators = document.querySelectorAll(".btn[data-operator]");
const pi = document.querySelector(".btn[data-pi]");
const sqrt = document.querySelector(".btn[data-sqrt]");
const reset = document.querySelector(".btn[data-reset]");
const back = document.querySelector(".btn[data-back]");
const equal = document.querySelector(".btn[data-equal]");
const btnZero = document.querySelector(".btn[data-number='0']");
const decimal = document.querySelector(".btn[data-decimal]");


const screenC = document.querySelector("#current");
const screenH = document.querySelector("#history");

let currentOperand = "";
let history = [];
let currentOperator = "";
let hasSqrt = false;

numbers.forEach((btn) => 
    btn.addEventListener("click", () => SetOperand(btn.dataset.number)));

operators.forEach((btn) => 
    btn.addEventListener("click", () => SetOperator(btn.dataset.operator)));

equal.addEventListener("click", () => 
{   
    if (history.length == 0)
        return;

    let previousResult = GetResult();
    let newResult = DoCalculate(previousResult, currentOperator, currentOperand);
    history = [];
    SendToHistory(previousResult);
    SendToHistory(currentOperator);
    SendToHistory(currentOperand);
    SendToHistory("=");
    ShowAtCurrent(newResult);
    
});
reset.addEventListener("click", () => 
{   
    history = [];
    currentOperand = "";
    currentOperator = "";
    screenC.textContent = 0;
    screenH.textContent = "";
    numbers.forEach((btn) => btn.classList.remove("disabled"));
    equal.classList.remove("disabled");
    pi.classList.remove("disabled");       
    back.classList.remove("disabled");       
    decimal.classList.remove("disabled");  
});
back.addEventListener("click", () => 
{   
    if (currentOperand.length > 0)
    currentOperand = currentOperand.slice(0, -1);

    if (currentOperand.length == 0){
        currentOperand = "";
        ShowAtCurrent("0");
    } 
    else 
        ShowAtCurrent(currentOperand);
});
pi.addEventListener("click", () => {currentOperand = ""; SetOperand(Math.PI) } );
sqrt.addEventListener("click", () => 
    {
        let tmp = screenC.textContent;
        currentOperand = "";
        SetOperand(Math.sqrt(tmp))
        history = [];
        SendToHistory("sqrt(" + tmp + ")");
        hasSqrt = true;
        numbers.forEach((btn) => btn.classList.add("disabled"));
        equal.classList.add("disabled");
        pi.classList.add("disabled");       
        back.classList.add("disabled");       
        decimal.classList.add("disabled");       
    });



function SetOperand(nmb){
    btnZero.classList.remove("disabled");
    currentOperand += nmb;
    ShowAtCurrent(currentOperand);
}
function SetOperator(opr){
    if (currentOperand == "" && history.length > 0) return;
    if (currentOperand == "" && history.length == 0) currentOperand = 0;

    if (history.indexOf("=") != -1){
        currentOperand = screenC.textContent;
        history = []
    }
    if (hasSqrt){
        currentOperand = screenC.textContent;
        history = []
        hasSqrt = false;
        numbers.forEach((btn) => btn.classList.remove("disabled"));
        equal.classList.remove("disabled");
        pi.classList.remove("disabled");       
        back.classList.remove("disabled");       
        decimal.classList.remove("disabled");    
    }
    
    SendToHistory(currentOperand);
    SendToHistory(opr);
    if (currentOperator != "")
        ShowAtCurrent(GetResult());
    else
        ShowAtCurrent(currentOperand);

    currentOperand = "";
    currentOperator = opr;

    if (opr == "/")
        btnZero.classList.add("disabled");
    else
        btnZero.classList.remove("disabled");

}
function SendToHistory(unit){  
    if (!isNaN(unit)) unit = round(unit);
    history.push(unit);

    screenH.textContent = "";
    history.forEach((el) => screenH.textContent += el + " ");
}
function ShowAtCurrent(unit){
    screenC.textContent = round(unit);
}
function GetResult(){
    let results = JSON.parse(JSON.stringify(history));

    if (isNaN(results[results.length - 1]))
        results.pop();

    if (results.length == 1)
        return results[0];

    let i = 1;
    while (results.length > 1){
        if (i > results.length - 1) i = 1;
        let a = results[i-1];
        let operand = results[i]
        let b = results[i + 1];
        if (results.indexOf("*") > -1 || results.indexOf("/") > -1){
            if (operand == "+" || operand == "-")
                i += 2;
            else
                results.splice(i-1, 3,  DoCalculate(a, operand, b));
        } 
        else
            results.splice(i-1, 3,  DoCalculate(a, operand, b));
    }
    return results[0];

}

function DoCalculate(a, operand, b){
    a *= 1;
    b *= 1;
    let r = a;
    switch(operand){
        case "+":
            r = Add(a,b)
            break;
        case "-":
            r = Subtract(a,b)
            break;
        case "/":
            r = Divide(a,b) 
            break;
        case "*":
            r = Multiply(a, b) 
            break;
    }
     return r;
}

function Add(a, b){
    return a + b;
}
function Multiply(a, b){
    return a * b;
}
function Subtract(a, b){
    return a - b;
}
function Divide(a, b){
    return a / b;
}
function round(number) {
    return Math.round(number * 1000) / 1000;
  }