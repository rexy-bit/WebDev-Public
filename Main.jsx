import React from 'react'
import IngredientsInputs from './IngredientsInputs.jsx';
import IngredientsList from './IngredientsList.jsx';
import ReadyRecipe  from './ReadyRecipe.jsx';
import Recipe from './Recipe.jsx';
function Main(){

    const [ingredients, setIngredients] = React.useState(()=>{
     
        const saved = localStorage.getItem('ingredients');

        return saved ? JSON.parse(saved) : 
          
        [
        'Tomatoes',
        'carrots',
        'Cheese',
        'Chiken',
        'Bread'
    ];

});

    const [recipe, setRecipe] = React.useState(false);
    return(
        <>
          <IngredientsInputs
           ingredients={ingredients}
           setIngredients={setIngredients}
          />

          <IngredientsList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />

          <ReadyRecipe
          ingredients={ingredients}
          recipe={recipe}
          setRecipe={setRecipe}
          />

          <Recipe
            recipe={recipe}
            ingredients={ingredients}
            
          />
        </>
    )
}


export default Main