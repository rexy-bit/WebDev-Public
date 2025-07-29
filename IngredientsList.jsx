import React from 'react'

function IngredientsList(props){

    function removeIngredient(index){

        const newIngredients = props.ingredients.filter((_,i)=> index !== i);

        props.setIngredients(newIngredients);
        localStorage.setItem('ingredients', JSON.stringify(newIngredients));
    }

    return(
       
        props.ingredients.length > 0 && <>
          
            <div className="ingredients-list">
                       <h2 className='onhand'>Ingredients on hand:</h2>

        <div className="ingredients">
            
            {props.ingredients.map((ingredient,i)=>{
                  return(
                    <li key={i} onClick={()=>{removeIngredient(i)}}>{ingredient}</li>
                  )         
            })}
        </div>

        </div>
        </>
    );
}

export default IngredientsList