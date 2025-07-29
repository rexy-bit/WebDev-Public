import React from 'react'
import TodoInputs from './Components/TodoInputs';
import DisplayTodoList from './Components/DisplayTodoList';



function Todo(){

    const [todoList, setTodoList] = React.useState(()=>{
        
        const saved = localStorage.getItem('todoList');

        return(
            saved ? JSON.parse(saved) : 

        [
        {
            name : 'Make dinner',
            date : '03/09/2025',
            done : false,
            id : '1'
        },
        {
            name: 'Go see grand parents',
            date: '29/09/2025',
            done: false,
            id : '2'
        }
    ]);
});



    return (
        <>
        <main>
           <h1>📝 To-Do-List</h1>

           <TodoInputs
            todoList={todoList}
            setTodoList={setTodoList}
           />

           <DisplayTodoList
              todoList={todoList}
              setTodoList={setTodoList}
            />
            
        </main>
        </>
    )


}

export default Todo