import React from "react";
import { getRecipeFromGemini} from "../ai.js";

function ReadyRecipe(props){

    async function getRecipe(){

        const generatedRecipe = await getRecipeFromGemini(props.ingredients);
        console.log(generatedRecipe)
        props.setRecipe(generatedRecipe);
        localStorage.setItem('recipe', JSON.stringify(generatedRecipe));
    }

    return(
         <div className="ready-div">
            <div className="ready-text">
                <h3>Ready for a recipe?</h3>
                <p className="generate">Generate a recipe from your list of ingredients</p>
            </div>

            <button className="get-button"
             onClick={()=>{getRecipe()}}
            >Get a recipe</button>
            
           </div>
    );
}

export default ReadyRecipe