

let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Losses : 0,
    Ties : 0
};

displayScore();

function pickComputerMove(){

    let computerMove = '';
    let randomNumber = Math.random();

    if(randomNumber < 1/3){
        computerMove = 'rock';

    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }else{
        computerMove = 'scissors';
    }

    return computerMove;
}

function playGame(playerMove){
    let result = '';

    let computerMove = pickComputerMove();

    switch(playerMove){

        case 'rock' : 
            if(computerMove === 'rock'){
                result = 'Tie';
            }else if(computerMove === 'paper'){
                result = 'Lose';
            }else{
                result = 'Win';
            }
            break;

          case 'paper' : 
                    if(computerMove === 'rock'){
                result = 'Win';
            }else if(computerMove === 'paper'){
                result = 'Tie';
            }else{
                result = 'Lose';
            }
            break;

            case 'scissors' : 
                     if(computerMove === 'rock'){
                result = 'Lose';
            }else if(computerMove === 'paper'){
                result = 'Win';
            }else{
                result = 'Tie';
            }
            break;
    }

    switch(result){
        case 'Win' : 
            score.Wins++;
            break;

        case 'Lose' : 
            score.Losses++;
            break;

        case 'Tie' : 
            score.Ties++;
            break;

    }

    document.querySelector('.display-result').innerHTML = `${result}.`;
   
    document.querySelector('.display-moves').innerHTML = `You picked <img src="emojis/${playerMove}-emoji.png" class="image">, Computer picked <img src="emojis/${computerMove}-emoji.png" class="image">`;
    displayScore();


      localStorage.setItem('score', JSON.stringify(score));
    
}


function displayScore(){
    document.querySelector('.display-score').innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}`;
}

function resetScore(){

    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    displayScore();
    localStorage.setItem('score', JSON.stringify(score));
      
}