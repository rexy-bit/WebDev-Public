import React from "react";

function IngredientsDisplay({ingredients, setIngredients}){

    if(ingredients.length === 0){

        return;
    }

    function removeIngredient(index){

        const newIngredients = ingredients.filter((_,i)=>i !== index );

        setIngredients(newIngredients);
        localStorage.setItem('ingredients', JSON.stringify(newIngredients));
    }

    return(
        <div className="ingredients-div">
            <h1>Ingredients on hand:</h1>

            <div className="ingredients">
                {ingredients.map((ingredient, i)=>{
                    return(
                        <li key={i} onClick={()=>{removeIngredient(i)}}>{ingredient}
                        </li>
                        
           
                    );
                })}
            </div>
        </div>
    );
}


export default IngredientsDisplay