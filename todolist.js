const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Make dinner',
    dueDate : '2024/10/4'
}];


function addTodo(){
    const nameInput = document.querySelector('.input-bar');
    const dueDateInput = document.querySelector('.input-date');

    const name = nameInput.value;
    const dueDate = dueDateInput.value;

    todoList.push({

        //name : name,
        //dueDate : dueDate

        name,
        dueDate
    });

    renderTodoList();
}

function renderTodoList(){

    let todoListHtml = '';

    for(let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i];

        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;

        const {name, dueDate} = todoObject;

        let html = `
        
        <div class="name">${name}</div>
        <div class="dueDate">${dueDate}</div>

        <button class="delete-button" onclick="
           
            todoList.splice(${i}, 1);
            renderTodoList();

        ">
        
           Delete
        </button>
    
    `

    todoListHtml += html;

    }

    document.querySelector('.display-todo').innerHTML = todoListHtml;

    localStorage.setItem('todoList', JSON.stringify(todoList));

    
}