let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name : 'Make dinner',
    date : '20/06/2025',
    state : 'Ndone'
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
        nameD.textContent = element.name;

        const dateD = document.createElement("div");
        dateD.className = "date";
        dateD.textContent = element.date;

        const statD = document.createElement("button");
        statD.className ="state-button"
        if(element.state === 'done'){
            statD.style.backgroundColor = "green";
        }else{
            statD.style.backgroundColor = "transparent";
        }

        statD.addEventListener('click', ()=>{
            if(element.state === 'done'){
                element.state = "Ndone";
                statD.style.backgroundColor = "transparent";
                
            }else{
                     element.state = "done";
                statD.style.backgroundColor = "green";
           
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
        todoD.appendChild(statD);
        todoD.appendChild(deleteButton);

        container.appendChild(todoD);

    });


    localStorage.setItem('todoList', JSON.stringify(todoList));
}


function addTodo(){


    let nameIn = document.querySelector(".input-name");
    let dateIn = document.querySelector(".input-date");

    let name = nameIn.value;
    let date = dateIn.value;

    if(name === '' || date === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

         let state = "Ndone";

         todoList.push({
            name,
            date,
            state
         });

         displayTodo();


          document.querySelector(".display-success-message").innerHTML = 'Todo added with success';

          setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML = '';
          }, 3000);

    }


}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addTodo();
})

document.body.addEventListener('keydown', (e)=>{
 
    if(e.key === 'Enter'){
    addTodo();
    }
});