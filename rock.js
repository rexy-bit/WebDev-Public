let scoreRock  = JSON.parse(localStorage.getItem('scoreRock')) ||  {
    Wins : 0,
    Losses : 0,
    Ties : 0
};

function pickComputerMove(){
  
    let computerMove  = '';

    let randomNumber = Math.random();

    if(randomNumber < 1/3){
        computerMove = 'rock';

    }else if(randomNumber >= 1/3 && (randomNumber < 2/3)){
          computerMove = 'paper';
    }else{
        computerMove = 'scissors';
    }

    return computerMove;

}


function playGame(playerMove){

    let computerMove = pickComputerMove();

    let result = '';

    switch(playerMove){

        case 'rock' :

            switch(computerMove){
                case 'rock' : 
                result = 'Tie';
                break;
                
                case 'paper' : 
                    result = 'Lose';
                    break;

                case 'scissors' : 
                    result = 'Win';
                    break;
            }
            break;

        case 'paper' : 
           
             switch(computerMove){
                case 'rock' : 
                result = 'Win';
                break;
                
                case 'paper' : 
                    result = 'Tie';
                    break;

                case 'scissors' : 
                    result = 'Lose';
                    break;
            }
            break;

        case 'scissors' : 

            switch(computerMove){
                case 'rock' : 
                result = 'Lose';
                break;
                
                case 'paper' : 
                    result = 'Win';
                    break;

                case 'scissors' : 
                    result = 'Tie';
                    break;
            }
            break;
    }

    switch(result){

        case 'Win' : 
           scoreRock.Wins++;
           break;
        case 'Lose' : 
            scoreRock.Losses++;
            break;
        case 'Tie' : 
           scoreRock.Ties++;
           break;


    }

    document.querySelector(".display-result").innerHTML = `${result}`;
    document.querySelector(".display-moves").innerHTML = `You picked ${playerMove}, Computer picked ${computerMove}`;
    document.querySelector(".display-score").innerHTML = `Wins : ${scoreRock.Wins}, Losses : ${scoreRock.Losses}, Ties : ${scoreRock.Ties}`;

    localStorage.setItem('scoreRock', JSON.stringify(scoreRock));

}

function resetScore(){

    scoreRock.Wins =  0;
    scoreRock.Losses = 0;
    scoreRock.Ties = 0;

    displayScore();
    localStorage.setItem('scoreRock', JSON.stringify(scoreRock))

}

function displayScore(){

    document.querySelector(".display-score").innerHTML = `Wins : ${scoreRock.Wins}, Losses : ${scoreRock.Losses}, Ties : ${scoreRock.Ties}`;

}

document.querySelector(".score-button").addEventListener('click', ()=>{
    displayScore();
});


document.querySelector(".reset-button").addEventListener('click', ()=>{
    resetScore();
});

document.querySelector(".rock-button").addEventListener('click', ()=>{
    playGame('rock');
});

document.querySelector(".paper-button").addEventListener('click', ()=>{
    playGame('paper');
});

document.querySelector(".scissors-button").addEventListener('click', ()=>{
    playGame('scissors');
});