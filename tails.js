



const headsButton = document.querySelector(".heads");
const tailsButton = document.querySelector(".tails");

const resetButton = document.querySelector(".reset-score");
const showButton = document.querySelector(".show-score");
const autoPlay = document.querySelector(".auto-play");




let score = JSON.parse(localStorage.getItem("score")) || {
    Wins : 0,
    Losses : 0

};
displayScore();

headsButton.addEventListener("click", ()=>{
    playGame("heads");
});

tailsButton.addEventListener("click", ()=>{
    playGame("tails");

});


resetButton.addEventListener("click", ()=>{
    resetScore();
});

showButton.addEventListener("click", ()=>{
    displayScore();
});

function pickComputerMove(){
    let randomNumber = Math.random();

    let computerMove = "";

    if(randomNumber<= 0.5){
        computerMove = "heads";
    }else{
        computerMove = "tails";
    }

    return computerMove;
}


function playGame(playerMove){

     let computerMove = pickComputerMove();
     let result = "";
     let guess = "";

     if(playerMove === computerMove){
        result = "Win";
        guess = "Correct";
     }else{
        result = "Lose";
        guess= "Incorrect";
     }

     if(result === "Win"){
        score.Wins++;
     }else if(result === "Lose"){
        score.Losses++;
     }
     saveScore();
     document.querySelector(".display-result").innerHTML = `You ${result}`;
     document.querySelector(".display-moves").innerHTML = `You chose ${playerMove}, 
     computer chose ${computerMove}, So your guess was ${guess}`;
     displayScore();
     


}

function displayScore(){
     
    document.querySelector(".display-score").innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}`;

}

function saveScore(){
    localStorage.setItem("score", JSON.stringify(score));
}

function resetScore(){

    score = {
        Wins : 0,
        Losses : 0
    };
    saveScore();
    displayScore();

}

let isAutoPlaying = false;
let intervalId;
autoPlay.addEventListener("click", ()=>{
  

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
