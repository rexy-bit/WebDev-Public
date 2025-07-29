import React from "react";

function IngredientsInputs(props){

    function addIngredient(formData){

         
        console.log("form submited !")
        
        const newIngredient = formData.get("ingredient");

        const trouve = props.ingredients.find((ingredient)=> ingredient.toLowerCase() === newIngredient.toLowerCase());

        if(trouve || !newIngredient){
            return;
        }

        const newIngredients = [...props.ingredients, newIngredient];
         console.log(newIngredients);
        props.setIngredients(newIngredients);
        

        localStorage.setItem('ingredients', JSON.stringify(newIngredients));

        
    }

    return(
        <form className="inputs" action={addIngredient}>

              <input 
              type="text"
              
              className="in" 
              placeholder="e.g. basilic"
              name="ingredient"
              />

              <button className="add-button" type="submit">
                + Add ingredient
              </button>

        </form>
    );
           
}

export default IngredientsInputs