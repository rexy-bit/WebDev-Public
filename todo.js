let todoList =JSON.parse(localStorage.getItem('todoList')) || [
    {
        name : 'Make dinner',
        date : '08/07/2025',
        state : 'done'
    }
];


function displayTodoList(){

    let container = document.querySelector(".display-content");
    container.innerHTML = '';


    todoList.forEach((todo, i)=>{

        const todoDiv = createTodo(todo, i);

        container.appendChild(todoDiv);
    });

    localStorage.setItem('todoList', JSON.stringify(todoList));
    
}

displayTodoList();


function createTodo(todo, i){

    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-div";
    
    const nomDiv = document.createElement("div");
    nomDiv.textContent = `- Name : ${todo.name}`;

    const dateDiv = document.createElement("div");
    dateDiv.textContent = `- Date : ${todo.date}`;

    const stateButton = document.createElement("button");
    stateButton.className = "state-button";
    stateButton.textContent = todo.state;

    if(todo.state === "done"){
            stateButton.style.backgroundColor = "green";
            
        }else{
            stateButton.style.backgroundColor = "transparent";
            
        }

    stateButton.addEventListener('click', ()=>{
         
        if(todo.state === "done"){
            stateButton.style.backgroundColor = "transparent";
            todo.state = "undone";
        }else{
            stateButton.style.backgroundColor = "green";
            todo.state = "done";
        }

        displayTodoList();
        displayDone();
        displayUndone();

    });


    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=>{
        todoList.splice(i, 1);

        displayTodoList();
        displayDone();
        displayUndone();
    });


    todoDiv.appendChild(nomDiv);
    todoDiv.appendChild(dateDiv);
    todoDiv.appendChild(stateButton);
    todoDiv.appendChild(deleteButton);


    return todoDiv;
}



let addMsgTimeout;
function addTodo(){

    let nameIn = document.querySelector(".input-name");
    let name = nameIn.value;

    let dateIn = document.querySelector(".input-date");
    let date = dateIn.value;

    let stateIn = document.querySelector(".input-state");
    let state = stateIn.value;

     const addMsg = document.querySelector(".add-msg");

    if(!name || !date || !state){
        
        addMsg.style.color = "red";
        addMsg.innerHTML = "Please enter all the necessary information";

        clearTimeout(addMsgTimeout);

        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2000);

    }else{

        todoList.push({
            name,
            date,
            state
        });

        displayTodoList();

        addMsg.style.color = "green";
        addMsg.innerHTML = 'Todo added with success';

        clearTimeout(addMsgTimeout);
        addMsgTimeout = setTimeout(()=>{
            addMsg.innerHTML = '';
        }, 2000);

        nameIn.value = '';
        dateIn.value = '';
        stateIn.value = '';
    }

}

const addButton = document.querySelector(".add-button");
addButton.addEventListener('click', ()=>{
    addButton.disabled = true;

     addTodo();

     setTimeout(()=>{
        addButton.disabled = false;
     }, 2000);

});


function  displayDone(){

    const container = document.querySelector(".display-done");
    container.innerHTML = '';

    todoList.forEach((todo,i)=>{
        if(todo.state === "done"){
            let todoDiv = createTodo(todo, i);

            container.appendChild(todoDiv);
        }
    });

}

displayDone();

function displayUndone(){

    let container = document.querySelector(".display-undone");
    container.innerHTML = '';

    todoList.forEach((todo, i)=>{

        if(todo.state === "undone"){
            let todoDiv = createTodo(todo, i);

            container.appendChild(todoDiv);
        }
    });
}

displayUndone();
