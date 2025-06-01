let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Losses : 0

};

displayScore();

function pickComputerMove(){

    let randomNumber = Math.random();

    let computerMove = '';

    if(randomNumber < 1/2){
       computerMove = 'Tails';
    }else{
        computerMove = 'Heads';
    }

    return computerMove;

}

function playGame(playerMove){

    let computerMove = pickComputerMove();
    let result = '';

    if(playerMove === computerMove){
        score.Wins++;
         result = 'Win';
    }else{
        score.Losses++;
        result = 'Loss';
    }

    document.querySelector(".display-result").innerHTML = `You picked ${playerMove}, computer picked ${computerMove}, The result is ${result}`;
    displayScore();

    localStorage.setItem('score', JSON.stringify(score));
    
}

function displayScore(){
    document.querySelector(".display-score").innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}`;

}

function resetScore(){
    score.Wins = 0;
    score.Losses = 0;
    displayScore();
    localStorage.setItem('score', JSON.stringify(score));
}