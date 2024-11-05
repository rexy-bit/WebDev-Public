let todoList = [{
    name : 'Go to school',
    date :'20/3/2024',
},{
    name:'Go to bed',
    date : '5/11/2024'
}];

function renderTodoList(){
    let todoListHtml = '';

    for(let i = 0; i<= todoList.length; i++){
        const todoObject = todoList[i];

        ///const dueDate = todoObject.dueDate;
        ///const name = todoObject.name;

        const {name ,dueDate} = todoObject;

        let html = `
           <div class="name">
             ${name}
           </div>

           <div  class="dueDate">
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


    document.querySelector('.display-todo').innerHtml = todoListHtml;
}

function addTodo(){

    const inputName = document.querySelector('.input-todo');
    const inputDate = document.querySelector('.input-date');

    const name = inputName.value;
    const dueDate = inputDate.value;

    todoList.push({
        //name : name,
        //dueDate : dueDate,

        name,
        dueDate
    })

    renderTodoList();
}