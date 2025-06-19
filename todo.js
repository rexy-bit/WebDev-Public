let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Make Dinner',
    date : '19/06/2006',
    state : 'undone'
}];

displayTodo();


function displayTodo(){


    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    todoList.forEach((element, i)=>{

        const todoD = document.createElement("div");
        todoD.className = "todo-div";

        const nameD = document.createElement("div");
        nameD.className = "name";
        nameD.textContent = `Todo : ${element.name}`;

        const dateD = document.createElement("div");
        dateD.className = "date";
        dateD.textContent = `Date : ${element.date}`;

        const stateButton = document.createElement("button");
        stateButton.className = "state-button";
        if(element.state === 'done'){
            stateButton.style.backgroundColor = "green";
        }else{
            stateButton.style.backgroundColor = "transparent";
        }

        stateButton.addEventListener('click', ()=>{
            if(element.state === 'done'){
                element.state = 'undone';
                stateButton.style.backgroundColor = "transparent";
            }else{
                element.state = 'done';
                stateButton.style.backgroundColor = "green";
            }

            localStorage.setItem('todoList', JSON.stringify(todoList));
        });


      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener('click', ()=>{
        todoList.splice(i, 1);
        displayTodo();
      });


      todoD.appendChild(nameD);
      todoD.appendChild(dateD);
      todoD.appendChild(stateButton);
      todoD.appendChild(deleteButton);

      container.appendChild(todoD);
    });

    localStorage.setItem('todoList', JSON.stringify(todoList));

}

let intervalId;
let timeId;
function addTodo(){


    let nameIn = document.querySelector(".input-name");
    let dateIn = document.querySelector(".input-date");

    let name = nameIn.value;
    let date = dateIn.value;

    if(name === '' || date === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';

        clearTimeout(intervalId);

        intervalId = setTimeout(()=>{
            document.querySelector(".display-error-message").innerHTML = '';
        }, 3000);

    }else{

        document.querySelector(".display-error-message").innerHTML = '';
        let state = 'undone';

        todoList.push({
            name,
            date,
            state
        });

        displayTodo();

        document.querySelector(".display-success-message").innerHTML = 'Todo Added successfuly'   ;

        clearTimeout(timeId);

        timeId = setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);        

        nameIn.value = '';
        dateIn.value = '';

    }

}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addTodo();
});


function displayDone(){

    let container = document.querySelector(".display-done");
    container.innerHTML = '';
    todoList.forEach((element, i)=>{
        if(element.state === 'done'){
        const todoD = document.createElement("div");
        todoD.className = "todo-div";

        const nameD = document.createElement("div");
        nameD.className = "name";
        nameD.textContent = `Todo : ${element.name}`;

        const dateD = document.createElement("div");
        dateD.className = "date";
        dateD.textContent = `Date : ${element.date}`;

        todoD.appendChild(nameD);
        todoD.appendChild(dateD);

        container.appendChild(todoD);
        
        }
    });
}

displayDone();

function displayUndone(){

    let container = document.querySelector(".display-undone");
    container.innerHTML = '';
    todoList.forEach((element, i)=>{
        if(element.state === 'undone'){
        const todoD = document.createElement("div");
        todoD.className = "todo-div";

        const nameD = document.createElement("div");
        nameD.className = "name";
        nameD.textContent = `Todo : ${element.name}`;

        const dateD = document.createElement("div");
        dateD.className = "date";
        dateD.textContent = `Date : ${element.date}`;

        todoD.appendChild(nameD);
        todoD.appendChild(dateD);

        container.appendChild(todoD);
        
        }
    });
}

displayUndone();

let timeDone;
function displayNbrDone(){

    let cpt = 0;

    todoList.forEach((element, i)=>{
        if(element.state === 'done'){
            cpt++;
        }
    });

    document.querySelector(".disp-done").innerHTML = `${cpt}`;

    clearTimeout(timeDone);
     timeDone = setTimeout(()=>{
       document.querySelector(".disp-done").innerHTML = '';
    }, 3000);
}


document.querySelector(".done-button").addEventListener('click', ()=>{
    displayNbrDone();
});

let timeU;
function displayNbrUndone(){


    let cpt = 0;

    todoList.forEach((element, i)=>{
        if(element.state === 'undone'){
            cpt++;
        }
    });

    document.querySelector(".disp-undone").innerHTML = `${cpt}`

  
    clearTimeout(timeU);

    timeU = setTimeout(()=>{
        document.querySelector(".disp-undone").innerHTML = '';
    }, 3000);

}


document.querySelector(".undone-button").addEventListener('click', ()=>{
    displayNbrUndone();
});