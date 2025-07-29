import React from "react";
import { getRecipeFromGemini } from "../ai";
import IngredientsInputs from "./IngredientsInputs";
function ReadyRecipe(props){

     const [isLoading, setIsLoading] = React.useState(false);
     
     async function getRecipe(){
        setIsLoading(true);
        const generatedRecipe = await getRecipeFromGemini(props.ingredients);
        console.log(generatedRecipe);
        props.setRecipe(generatedRecipe);
       setIsLoading(false);
     }

    return(

        props.ingredients.length > 3 && 
        <>
        <div className="ready-recipe">
            <div className="div1">
            <h3>Ready for a recipe?</h3>
            <p className="generate">Generate a recipe from your list of ingredients</p>
            </div>

            <button className="get-button" onClick={getRecipe}>
                {isLoading ? "Loading..." : "Get a recipe"}
            </button>
        </div>

        

        </>
    );
}

export default ReadyRecipe