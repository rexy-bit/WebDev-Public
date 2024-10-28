const todoList =JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Go to school',
    dueDate : '2024-10-30'
},  {
    name : 'Go to sleep',
    dueDate : '2024-10-29'
}];


function displayTodo(){

    const todoInput = document.querySelector('.input-todo');
    const dateInput = document.querySelector('.input-date');

    const name = todoInput.value;
    const dueDate = dateInput.value;

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
            <div class="name">
              ${name}
            </div>

            <div class="dueDate">
            ${dueDate}
            </div>

            <button class="delete-button" onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
                
            ">
              Delete
            </button>
        `;

       todoListHtml += html;


    }

    document.querySelector('.display-todo').innerHTML = todoListHtml;

    localStorage.setItem('todoList', JSON.stringify(todoList));
}