const numbers = document.querySelectorAll(".btn[data-number]");
const numberZero = document.querySelector(".btn[data-number='0']");
const operators = document.querySelectorAll(".btn[data-operator]");

const equal = document.querySelector(".btn[data-equal]");
const pi = document.querySelector(".btn[data-pi]");
const sqrt = document.querySelector(".btn[data-sqrt]");
const reset = document.querySelector(".btn[data-reset]");
const back = document.querySelector(".btn[data-back]");
const decimal = document.querySelector(".btn[data-decimal]");


const screenC = document.querySelector("#current");
const screenE = document.querySelector("#elements");





numbers.forEach((btn) => btn.addEventListener("click", () => AppendToCurrentValue(btn.dataset.number)));
operators.forEach((btn) => btn.addEventListener("click", () => SetOperator(btn.dataset.operator)));

equal.addEventListener("click", () => {   
    if (elements.length == 0) return;
    if (isNaN(elements[elements.length - 1]))
        elements.push(+currentValue);
   let r = GetResult();
   DisplayToCurrentScreen(r);
   RefreshOperationElementsScreen();
   currentValue = r;
})
pi.addEventListener("click", () => {   
    currentValue = "";
    AppendToCurrentValue(round(Math.PI));
})
sqrt.addEventListener("click", () => {   
    currentValue = round(Math.sqrt(currentValue));
    DisplayToCurrentScreen(currentValue);
})

reset.addEventListener("click", () => {   
    elements = [];
    currentValue = "";
    latestOperator = "";
    screenC.textContent = 0;
    screenE.textContent = "";
    numbers.forEach((btn) => btn.classList.remove("disabled"));
    equal.classList.remove("disabled");
});
back.addEventListener("click", () => {   
    if (currentValue.length > 0)
    currentValue = currentValue.slice(0, -1);

    if (currentValue.length == 0){
        currentValue = "";
        DisplayToCurrentScreen("0");
    } 
    else 
        DisplayToCurrentScreen(currentValue);
});


decimal.addEventListener("click", () => 
{   
    if (currentValue.indexOf(".") > -1) return;
    if (currentValue == "")
        AppendToCurrentValue("0");
    AppendToCurrentValue(".");
});

let latestOperator = "";
let currentValue = "";
let elements = [];

function AppendToCurrentValue(val){
    numberZero.classList.remove("disabled");
    currentValue += val;
    DisplayToCurrentScreen(currentValue);
}
function DisplayToCurrentScreen(val) { screenC.textContent = +val; }


function SetOperator(opr){
    if (currentValue == "" && elements.length == 0) 
        currentValue = "0";

    if (isNaN(elements[elements.length - 1]))
        elements.push(+currentValue);
    elements.push(opr);
    currentValue = "0";
    
    DisplayToCurrentScreen(currentValue);
    RefreshOperationElementsScreen();

    latestOperator = opr;

     if (opr == "/")
        numberZero.classList.add("disabled");
    else
        numberZero.classList.remove("disabled");
}
function RefreshOperationElementsScreen(){  
    screenE.textContent = "";
    elements.forEach((el) => screenE.textContent += el + " ");
}


function GetResult(){
    let results = JSON.parse(JSON.stringify(elements));

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
        if (results.indexOf("*") > -1 || results.indexOf("/") > -1)
        {
            if (operand == "+" || operand == "-")
            {
                i += 2;
                continue;
            }
        }
        results.splice(i-1, 3,  DoApply(a, operand, b));
        i = 1;
    }
    return  round(results[0]);
}

function DoApply(a, operand, b){
    a *= 1;
    b *= 1;
    let r = 0;

    switch(operand){
        case "+":
            return  a + b;
            break;
        case "-":
            return a - b;
            break;
        case "/":
            return a / b;
            break;
        case "*":
            return a *b;
            break;
    }
}

function round(number) 
{
    return Math.round(number * 1000) / 1000;
}