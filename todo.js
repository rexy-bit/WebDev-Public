let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Make dinner',
    date : '06/06/2025'
}];

displayTodo();

function displayTodo(){

    let todoHtml = '';

    for(let i = 0;i<todoList.length;i++){

        let html = `
           <div class="todo">
              <p class="name">${todoList[i].name}</p>
              <p class="date">${todoList[i].date}</p>

              <button class="delete-button" onclick="
                  todoList.splice(${i}, 1);
                  displayTodo();
              ">
                 Delete
              </button>
           </div>
        `;

        todoHtml += html;
    }

    document.querySelector(".display-content").innerHTML = todoHtml;

    localStorage.setItem('todoList', JSON.stringify(todoList));
  
}

function addTodo(){

    let nameInput = document.querySelector(".input-todo-name");
    let dateInput = document.querySelector(".input-date");

    let name = nameInput.value;
    let date = dateInput.value;

    if(name === '' || date === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the information';
    }else{
        document.querySelector(".display-error-message").innerHTML = '';

        todoList.push({
            name,
            date
        });

        nameInput.value = '';
        dateInput.value = '';

        displayTodo();
        document.querySelector(".display-success-message").innerHTML = 'Todo added with success';

        setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);

    }
}

let addButton = document.querySelector(".add-button");
addButton.addEventListener('click', ()=>{
    addTodo();
});


let scoreRock = {
    Wins : 0,
    Losses : 0,
    Ties : 0
};

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
    document.querySelector(".display-moves").innerHTML = `You picked ${playerMove}, computer picked ${computerMove}`;
    document.querySelector(".display-score").innerHTML = `Wins : ${scoreRock.Wins}, Losses : ${scoreRock.Losses}, Ties : ${scoreRock.Ties}`;

    localStorage.setItem('scoreRock', JSON.stringify(scoreRock));
}

document.querySelector(".rock-button").addEventListener('click', ()=>{
    playGame('rock');
});

document.querySelector(".paper-button").addEventListener('click', ()=>{
    playGame('paper');
});

document.querySelector(".scissors-button").addEventListener('click', ()=>{
    playGame('scissors');
});