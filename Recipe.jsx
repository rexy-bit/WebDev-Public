import React from "react";
import ReactMarkdown from 'https://esm.sh/react-markdown@7'

function Recipe(props){


    return(
     
        
        
                <section className="recipe" aria-live="polite">
                      <h2>Chef Claude recommends : </h2>
                       <ReactMarkdown>{props.recipe}</ReactMarkdown>
                    </section>

    );
}


export default Recipe