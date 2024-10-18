let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'make dinner',
    dueDate :'2024-12-12'
}];


function renderTodoList(){
   let todoListHtml = '';

   for(let i = 0; i < todoList.length; i++){
     const todoObject = todoList[i];
     
     //const name = todoObject.name;
     //const dueDate = todoObject.dueDate;

     const {name, dueDate} = todoObject;

     const html = `
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

function addTodoList(){
    const inputName = document.querySelector('.input-bar');

    const inputDate = document.querySelector('.input-date');

    const name = inputName.value;

    const dueDate = inputDate.value;

    todoList.push({
        name,
        dueDate
    });

    renderTodoList();

    
}
