let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Make dinner',
    date : '10/06/2006',

}];

displayTodo();
function displayTodo(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    for(let i = 0;i<todoList.length;i++){

        const todoDiv = document.createElement("div");
        todoDiv.className = "todo"
        

        const nameP = document.createElement("p");
        nameP.className = "name";
        nameP.textContent = todoList[i].name;

        const dateP = document.createElement("p");
        dateP.className = "date";
        dateP.textContent = todoList[i].date;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', ()=>{
            todoList.splice(i, 1);
            displayTodo();
        });

        todoDiv.appendChild(nameP);
        todoDiv.appendChild(dateP);
        todoDiv.appendChild(deleteButton);

        container.appendChild(todoDiv);
    }

    localStorage.setItem('todoList', JSON.stringify(todoList));

}

function addTodo(){

    let nameInput = document.querySelector(".input-name");
    let dateInput = document.querySelector(".input-date");

    let name = nameInput.value;
    let date = dateInput.value;

    if(name === '' || date === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

        todoList.push({
            name,
            date
        });

        displayTodo();


    }

}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addTodo();
});