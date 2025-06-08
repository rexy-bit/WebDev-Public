

let scoreHead = {
    Wins: 0,
    Losses : 0,
    Ties : 0
};

function pComputerMove(){
    let computerMove = '';

    let randomNumber = Math.random();

    if(randomNumber < 1/2){
        computerMove = 'Heads';
    }else{
        computerMove = 'Tails';
    }

    return computerMove;
}

function playG(playerMove){

    let computerMove = pComputerMove();
    let result = '';

    switch(playerMove){

        case 'Heads' : 
            switch(computerMove){
                case 'Heads' : 
                    result = 'Win';
                    break;

                case 'Tails' : 
                    result = 'Lose';
                    break;
                
            }
            break;

        case 'Tails' : 
          switch(computerMove){
                case 'Heads' : 
                    result = 'Lose';
                    break;

                case 'Tails' : 
                    result = 'Win';
                    break;
                
            }
            break;
    }


    if(result === 'Win'){
        scoreHead.Wins++;
    }else{
        scoreHead.Losses++;
    }

    document.querySelector(".display-result-head").innerHTML = `${result}`;
    document.querySelector(".display-score-head").innerHTML = `Wins : ${scoreHead.Wins}, Losses : ${scoreHead.Losses}`;

    localStorage.setItem('scoreHead', JSON.stringify(scoreHead));

}

document.querySelector(".head").addEventListener('click', ()=>{
    playG('Heads');
});

document.querySelector(".tails").addEventListener('click', ()=>{
    playG('Tails');
});