currentUser = JSON.parse(localStorage.getItem('currentUser'));


function displayH1(){

    if(currentUser && currentUser.username){
    document.querySelector(".employe-title").innerHTML = `Welcome ${currentUser.username}`;
    }else{
        window.location.hash = "connexion";
    }
}

displayH1();



let leave = [{
    nom : 'Rezgui',
    prenom : 'Yanis',
    departement : 'HR',
    start : '24/06/2025',
    end : '28/06/2006'

}];


function displayLeave(){

    let i = 0;
    let trouve = false;

    let user;
    while(i<leave.length && (!trouve)){
        if(leave[i].prenom.toLowerCase()=== currentUser.username.toLowerCase()){
           user = leave[i];
           trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        const container = document.querySelector(".add-content");
        container.innerHTML = '';

        const addDiv = document.createElement("div");
        addDiv.className = "user-info";

        const nomD = document.createElement("div");
        nomD.textContent = `-Last name : ${user.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = user.prenom;

        const departementD = document.createElement("div");
        departementD.textContent = user.departement;

        const startD = document.createElement("div");
        startD.textContent = user.start;

        const endD = document.createElement("div");
        endD.textContent = user.end;


        addDiv.appendChild(nomD);
        addDiv.appendChild(prenomD);
        addDiv.appendChild(departementD);
        addDiv.appendChild(startD);
        addDiv.appendChild(endD);

        container.appendChild(addDiv);
        
    }
}

displayLeave();