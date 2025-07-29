import React from 'react';


function Count({number}){
  return(
    <h2>{number}</h2>
  )
}
function App() {
    const [count , setCount] = React.useState(0);


    function increaseCount(){

      setCount(prevCount=> prevCount + 1);
    }

    function decreaseCount(){
      setCount(prevCount=> prevCount - 1);
    }
    return(

      <main>
        <div className="counter">
          <button className="minus"
           onClick={decreaseCount}
          >-</button>
          <Count
           number={count}
          />
          <button className='plus'
           onClick={increaseCount}
          >
            +
          </button>
        </div>
      </main>
    )
}

export default App;
