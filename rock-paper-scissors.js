let score = JSON.parse(localStorage.getItem('score')) ;
                if(score === null){
                score = {
                    wins :0,
                    losses :0,
                    ties : 0
                };
                
              }



        function playGame(playerMove){
              let computerMove = pickComputerMove();

              let result = '';

              updateScore();
            

              if(playerMove === 'rock' && computerMove === 'rock'){
                result = 'Tie.'
              }else if(playerMove === 'rock' && computerMove === 'paper'){
                result = 'You win.';
              }else if(playerMove === 'rock' && computerMove === 'scissors'){
                result = 'You lose.'
              }

              if(playerMove === 'paper' && computerMove === 'rock'){
                result = 'You win.'
              }else if(playerMove === 'paper' && computerMove === 'paper'){
                result = 'Tie.';
              }else if(playerMove === 'paper' && computerMove === 'scissors'){
                result = 'You lose.'
              }

              if(playerMove === 'scissors' && computerMove === 'rock'){
                result = 'You lose.'
              }else if(playerMove === 'scissors' && computerMove === 'paper'){
                result = 'You win.';
              }else if(playerMove === 'scissors' && computerMove === 'scissors'){
                result = 'Tie.'
              }

             
              if(result === 'You win.'){
                score.wins += 1;
              }else if(result === 'You lose.'){
                score.losses += 1;
              }else if(result === 'Tie.'){
                score.ties += 1;
              }


              updateScore();

              localStorage.setItem('score', JSON.stringify(score));


              document.querySelector('.display-result').innerHTML = `${result}`;

                document.querySelector('.display-moves').innerHTML = `Player picked 
                <img src="emojis/${playerMove}-emoji.png" class="icon">,
                 Computer picked <img src="emojis/${computerMove}-emoji.png" class="icon">`;


        }

        function pickComputerMove(){
            let randomNumber = Math.random();

            let computerMove ='';

            if(randomNumber >= 0 && randomNumber < 1/3){
                computerMove = 'rock';
            }else if(randomNumber >= 1/3 && randomNumber < 2/3){
                computerMove = 'paper';
            }else if(randomNumber >= 2/3 && randomNumber < 1){
                computerMove = 'scissors';
            }

            return computerMove;
        }

        function updateScore(){
            document.querySelector('.display-score').innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`; 

        }