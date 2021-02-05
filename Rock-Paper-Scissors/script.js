const RPS = Object.freeze(["paper", "scissors", "rock"]);
let playerScore = computerScore = roundsplayed = 0 ;
let resultEl, pScoreEl, cScoreEl, roundNumEl, gameResultEl;
 

function ComputerPlay(){
    return RPS[Math.floor(Math.random() * RPS.length)];
}

function GetRoundResults(playerSelection, computerSelection){
    let pSI = RPS.indexOf(playerSelection?.toLowerCase());
    let cSI = RPS.indexOf(computerSelection.toLowerCase());
    let total = pSI + cSI;
    let winner = 0;

    if (pSI == -1) { console.error(`Player input '${playerSelection}' is invalid.`); return; }
    if (pSI == cSI) return `Draw ! ${playerSelection} vs ${computerSelection}`;

    if (total == 3) winner = 2;
    else if (total == 2) winner = 0;
    else if (total == 1) winner = 1;

    if (winner == pSI)
        playerScore++;
    else
        computerScore++;

    return `${(winner == pSI ? "Player" : "Computer")} wins, ${playerSelection} vs ${computerSelection}`;
}

function PlayRound(e){
    let result = GetRoundResults(e.target.dataset.value, ComputerPlay());
    
    resultEl.innerHTML = result;
    pScoreEl.innerHTML = playerScore;
    cScoreEl.innerHTML = computerScore;



    if (roundsplayed == 4){
        if (playerScore > computerScore){
            gameResultEl.classList.add("win");
        }
        else{
            gameResultEl.classList.add("defeat");
        }
        gameResultEl.innerHTML = `${playerScore > computerScore ? 'Victory' : 'Defeat'} ! Refresh to play again.`
    
        let actionBtns = document.getElementsByClassName("action-btn");
        for(let i = 0; i < actionBtns.length; i++)
            actionBtns[i].classList.add("disabled");
    } else {
        roundsplayed++;
        roundNumEl.innerHTML = roundsplayed + 1;
    }
}

function SetupGame(){
    let actionBtns = document.getElementsByClassName("action-btn");
    for(let i = 0; i < actionBtns.length; i++)
        actionBtns[i].addEventListener("click", PlayRound);

    resultEl = document.getElementById("round-result");
    pScoreEl = document.getElementById("player-score");
    cScoreEl = document.getElementById("computer-score");
    roundNumEl = document.getElementById("round-number");
    gameResultEl = document.getElementById("game-result");
}

SetupGame();