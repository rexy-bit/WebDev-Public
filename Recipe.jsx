import React from "react";
import ReactMarkdown from 'https://esm.sh/react-markdown@7'
function Recipe(props){

    return(
        

         props.recipe &&  <div className="recipe">
            <h2>Chef Gaston recommends :</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
           </div>
        
    );
}

export default Recipe