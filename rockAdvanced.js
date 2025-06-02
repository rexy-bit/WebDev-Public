
let score = JSON.parse(localStorage.getItem("score")) || {
    Wins : 0,
    Losses : 0,
    Ties : 0
};


const rock = document.querySelector('.rock-button');
const paper = document.querySelector(".paper-button");
const scissors = document.querySelector(".scissors-button");


const scoreDisplay = document.querySelector(".show-score");
const resetScore = document.querySelector(".reset-score");

const playAuto = document.querySelector(".auto-play");


rock.addEventListener("click", () =>{
    playGame("rock");
});

paper.addEventListener("click", ()=>{
    playGame("paper");
});

scissors.addEventListener("click", ()=>{
    playGame("scissors");
});

resetScore.addEventListener("click", ()=>{
    resettheScore();
});

scoreDisplay.addEventListener("click", ()=>{
    displayScore();
});




let intervalId;
let isAutoplaying = false;

playAuto.addEventListener("click", ()=>{
      playAutoGame();
});

function playAutoGame(){

      if(!isAutoplaying){
          intervalId = setInterval(()=>{
            let playerMove = pickComputerMove();
            isAutoplaying = true;
            playGame(playerMove);
                 }, 1000);
      }else{
          clearInterval(intervalId);
          isAutoplaying = false;
      }


}

function pickComputerMove(){
    let computerMove = "";
    let randomNumber = Math.random();

    if(randomNumber <= 1/3){
        computerMove = "rock";
    }else if(randomNumber > 1/3 && randomNumber <= 2/3){
        computerMove = "paper";
    }else{
        computerMove = "scissors";
    }

    return computerMove;


}


function playGame(playerMove){

   let computerMove = pickComputerMove();
   let result = "";

   if(playerMove === "rock"){

    if(computerMove === "rock"){
        result = "Tie";
    }else if(computerMove === "paper"){
        result = "Lose"
    }else if(computerMove === "scissors"){
        result = "Win";
    }

   }else if(playerMove === "paper"){

    if(computerMove === "rock"){
        result = "Win";
    }else if(computerMove === "paper"){
        result = "Tie"
    }else if(computerMove === "scissors"){
        result = "Lose";
    }

   }else if(playerMove === "scissors"){

    if(computerMove === "rock"){
        result = "Lose";
    }else if(computerMove === "paper"){
        result = "Win"
    }else if(computerMove === "scissors"){
        result = "Tie";
    }

   }

   if(result === "Win"){
    score.Wins++;
   }else if(result === "Lose"){
    score.Losses++;
   }else if(result === "Tie"){
    score.Ties++;
   }


   document.querySelector(".display-result").innerHTML = `${result}`;
   document.querySelector(".display-moves").innerHTML = `You picked ${playerMove}, computer picked ${computerMove}`;

   displayScore();
   saveScore();


}


function displayScore(){

    document.querySelector(".display-score").innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}`;

}

function saveScore(){
    localStorage.setItem("score", JSON.stringify(score));
}

function resettheScore(){

    score = {
        Wins : 0,
        Losses : 0,
        Ties : 0
    };
    saveScore();
    displayScore();
}
