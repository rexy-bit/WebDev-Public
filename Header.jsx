import React from "react";
import chefGaston from "../assets/chef-claude-icon.png"


function Header(){

    return(
        <header>
            <img src={chefGaston} alt="chef image" className="image" width="70"/>
            <h1>Chef Gaston</h1>
        </header>
    );
}

export default Header