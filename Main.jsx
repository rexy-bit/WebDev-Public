import React from "react";

import IngredientsDisplay from "./IngredientsDisplay.jsx";
import ReadyRecipe  from "./ReadyRecipe.jsx";
import Recipe from "./Recipe.jsx";

import { getRecipeFromGemini } from "../ai.js";


function ChefClaudeAll({ingredients, setIngredients, recipeShown, setRecipeShow, recipe, setRecipe}){

    
   
    

    return(
        <>

        {ingredients.length !== 0 && (
            <>
            <section>

           <IngredientsDisplay
            ingredients={ingredients}
            setIngredients={setIngredients}
           />

             
             {ingredients.length >= 4 && <ReadyRecipe 
              ingredients={ingredients}
              recipeShown={recipeShown}
              setReciepeShow={setRecipeShow}
              recipe={recipe}
              setRecipe={setRecipe}
             />}
          
           </section>
        
           {recipe && <Recipe
             recipe={recipe}
             
           />}
                    </>
                    )
      }
</>
      );
}

function Main(){


    const [ingredients, setIngredients] = React.useState(()=>{
        const saved = localStorage.getItem('ingredients');

        return saved ? JSON.parse(saved) : 
            ['tomato', 'olives', 'eggs', 'olive oil'];
    });
   


    const [recipeShown, setRecipeShow] = React.useState(false);

    const [recipe, setRecipe] = React.useState(()=>{
       const saved = localStorage.getItem('recipe');

       return saved ? JSON.parse(saved) : 
         ''
    });

    function addIngredient(formData){
          const newIngredient = formData.get("ingredient");
          if(!newIngredient){
            return;
          }

          const newIngredients = [...ingredients, newIngredient];
          setIngredients(newIngredients)

          localStorage.setItem('ingredients', JSON.stringify(newIngredients));
    }


    return(
        <>
        <div className="main">
    
        <form className="inputs" action={addIngredient}>
            <input 
            type="text" 
            className="in" 
            placeholder="e.g. oregano"
            name="ingredient"
            />

            <button 
            className="add-button">
                + Add ingredient
            </button>
        </form>

          <ChefClaudeAll
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipeShown={recipeShown}
          setReciepeShow={setRecipeShow}
          recipe={recipe}
          setRecipe={setRecipe}
          />
    
    </div>
        </>
    );
    
}

export default Main