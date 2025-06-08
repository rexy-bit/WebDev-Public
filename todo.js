let todoList = [{
    name : 'Make Dinner',
    date : '05/08/2025'
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

    let nameInput = document.querySelector(".input-name");
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

        displayTodo();

        document.querySelector(".display-success-message").innerHTML = 'Todo Added successfuly';
        
        setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);
    }
}

document.querySelector(".add-button").addEventListener('click', ()=>{
    addTodo();
});