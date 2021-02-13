const gridContainer = document.querySelector("#grid-container");
const eraseBtn = document.querySelector("#erase-btn");
const colorBtn = document.querySelector("#color-btn");
const sizeBtn = document.querySelector("#size-btn");
const sizeInfo = document.querySelector("#size-info");

let currentColor;
let currentCell;
let mouseClicked;
let erase;

function init(){
    SetGridSize(sizeBtn.value);
    currentColor = colorBtn.value
    sizeInfo.textContent = `Size: ${sizeBtn.value}`;

    sizeBtn.addEventListener("input", () => {
        SetGridSize(sizeBtn.value);
        sizeInfo.textContent = `Size: ${sizeBtn.value}`;
    })
    
}

function SetGridSize(size){
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    while (gridContainer.firstChild) gridContainer.removeChild(gridContainer.firstChild);

    for(let i = 0; i < size * size; i++){
        const gridElement = document.createElement("div");
        gridElement.classList = "grid-element";
        gridElement.addEventListener("mouseover", highlightCellColor);
        gridContainer.appendChild(gridElement);
    }
    
    gridContainer.addEventListener("mousedown", (e) =>{
        mouseClicked = true;
        if (currentCell)
        SetCellColor(currentCell);
    })
    gridContainer.addEventListener("mouseup", (e) => mouseClicked = false);
}

function highlightCellColor(e){
    if (mouseClicked)
    SetCellColor(e.target);
    
    currentCell = e.target;
}



function SetCellColor(cell) { 
    cell.style.backgroundColor = erase ? "#DDDDDD" : currentColor; 
}


// Buttons
function ToggleErase(){
    erase = !erase;
    
    if (erase)
    eraseBtn.classList.add("enabled");
    else
    eraseBtn.classList.remove("enabled");
}
function SetColor(color){
    currentColor = color;
}

window.addEventListener("load", init());
