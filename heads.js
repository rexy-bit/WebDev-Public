const headsButton = document.querySelector(".heads");
const tailsButton = document.querySelector(".tails");
const resetButton = document.querySelector(".reset-score");
const showScoreButton = document.querySelector(".show-score");
const autoPlayButton = document.querySelector(".auto-play");




let score = JSON.parse(localStorage.getItem("score")) ||{
    Wins : 0,
    Losses : 0
};

displayScore();


let intervalId;

let isAutoPlaying = false;

autoPlayButton.addEventListener("click", ()=>{

    if(!isAutoPlaying){
        intervalId = setInterval(()=>{
            let playerMove = pickComputerMove();
            playGame(playerMove);
            

        }, 1000);
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
});

headsButton.addEventListener("click", ()=>{
    playGame("heads");
});

tailsButton.addEventListener("click", ()=>{
    playGame("tails");
});

resetButton.addEventListener("click", ()=>{
    resetScore();
});


showScoreButton.addEventListener("click", ()=>{
    displayScore();
});

function pickComputerMove(){
    let randomNumber = Math.random();

    let computerMove = "";

    if(randomNumber <= 0.5){
        computerMove = "Heads";
    }else{
        computerMove = "Tails";
    }

    return computerMove;

}

function playGame(playerMove){

    let computerMove = pickComputerMove();
    
    let result = "";
    let guess = "";

    if(playerMove === computerMove){
        result = "Win";
        guess="correct";
    }else{
        result = "Lose";
        guess="wrong";
    }

    if(result === "Win"){
        score.Wins++;
    }else if(result === "Lose"){
        score.Losses++;
    }
   saveScore();
    document.querySelector(".display-result").innerHTML = `You ${result}`;
    document.querySelector(".display-moves").innerHTML = `You chose ${playerMove}, Computer chose ${computerMove}, So your guess was ${guess}`;
    displayScore();
}


function displayScore(){
    document.querySelector(".display-score").innerHTML = `Wins : ${score.Wins} | Losses : ${score.Losses} `;
}

function saveScore(){
    localStorage.setItem("score", JSON.stringify(score));

}

function resetScore(){
    score.Wins = 0;
    score.Losses = 0;
    saveScore();
    displayScore()
}

