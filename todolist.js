todoList = [{
    name : 'Make dinner',
    dueDate : '2024/12/12'
}, {
    name : 'Watch youtube',
    dueDate : '2024/11/1'
}];

function renderTodoList(){
    let todoListHtml = '';

    for(let i = 0; i<= todoList.length; i++){
        const todoObject = todoList[i];

        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;

        const {name, dueDate} = todoObject;

        let html = `
           <div class = "name">
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
        `

        todoListHtml += html;
    }


    document.querySelector('.display-todo').innerHTML = html;
}


function addTodo(){

    const nameInput = document.querySelector('.input-todo');
    const dateInput = document.querySelector('.input-date');

    const name = nameInput.value;
    const dueDate = dateInput.value;

    todoList.push({
        //name : name,
        //dueDate : dueDate,

        name,
        dueDate
    });

    renderTodoList();
}