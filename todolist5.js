
const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    

        name : 'Make dinner',
        dueDate : '2024/12/12'
    
}];

function renderTodoList(){
    let todoListHtml = '';

    for(let i = 0; i < todoListHtml.length; i++){
        const todoObject = todoList[i];

        //const name = todoList.name;
        //const dueDate = todoList.dueDate;

        const {name, dueDate} = todoObject;

        const html = `

        <div class="name">
           ${name}
        </div>

        <div class="dueDate">
           ${dueDate}
        </div>

        <button class="delete-button" onlick="
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

function addTodo(){
    const nameInput = document.querySelector('.input-bar')
    const dueDateInput = document.querySelector('.input-date');

    const name = nameInput.value;

    const dueDate = dueDateInput.value;

    todoList.push(
        {
            //name : name,
            //dueDate : dueDate

            name,
            dueDate
        }
    );

    renderTodoList;
}