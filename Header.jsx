import React from "react";
import chefClaude from '../assets/chef-claude-icon.png'

function Header(){

    return(
        <header>
           <img src={chefClaude} alt="chef claude image" className="chef-claude"/>
           Chef Claude
        </header>
    );
}

export default Header