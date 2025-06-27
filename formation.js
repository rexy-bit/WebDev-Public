const humburger = document.querySelector(".humburger");
const navElement = document.querySelector("nav");


humburger.addEventListener('click', ()=>{

    if(navElement.style.display === 'none'){
        navElement.style.display = 'flex';
    }else{
        navElement.style.display = 'none';
    }
});



let formations = JSON.parse(localStorage.getItem('formations')) || [{
    code : '0',
    nom : 'Rezgui',
    prenom : 'Yanis',
    titre : 'Comportement a adopter en entreprise',
    date : '30/06/2006',
    statut : 'ongoing'
}];


function displayForm(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    formations.forEach((form, i)=>{

        const formDiv = document.createElement("div");
        formDiv.className = "formation-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${form.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last name : ${form.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First name : ${form.prenom}`;

        const titreD = document.createElement("div");
        titreD.textContent = `- Title : ${form.titre}`;

        const dateD = document.createElement("div");
        dateD.textContent = `- Date : ${form.date}`;

        const statutD = document.createElement("div");
        statutD.textContent = `- Statut : ${form.statut}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"
        deleteButton.addEventListener('click', ()=>{
            formations.splice(i, 1);
            displayForm();
        });


        formDiv.appendChild(codeD);
        formDiv.appendChild(nomD);
        formDiv.appendChild(prenomD);
        formDiv.appendChild(titreD);
        formDiv.appendChild(dateD);
        formDiv.appendChild(statutD);
        formDiv.appendChild(deleteButton);

        container.appendChild(formDiv);
    });

    localStorage.setItem('formations', JSON.stringify(formations));

}


displayForm();


let time1;
function addForm(){

    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let prenomIn = document.querySelector(".input-prenom");
    let titreIn = document.querySelector(".input-titre");
    let dateIn = document.querySelector(".input-date");
    let statutIn = document.querySelector(".input-statut");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let titre = titreIn.value;
    let date = dateIn.value;
    let statut= statutIn.value;

    let trouve = false;
    let i = 0;

    while(i<formations.length && (!trouve)){
        if(formations[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    const msg = document.querySelector(".add-message");
    msg.style.color = "red";

    if(trouve){
       
        msg.innerHTML = 'The code you entered already exists.';
    }else if(code === '' || nom === '' || prenom === '' || titre === '' || date === '' || statut === ''){
        msg.innerHTML = 'Please enter all the necessary information';
    }else{

        msg.innerHTML = '';

        formations.push({
            code,
            nom,
            prenom,
            titre,
            date,
            statut
        });

        displayForm();
        msg.style.color = "green";
        msg.innerHTML = 'Training added with success';

        clearTimeout(time1);

        time1 = setTimeout(()=>{
            msg.innerHTML = '';
        }, 2000);

        codeIn.value = '';
        nomIn.value = '';
        prenomIn.value = '';
        titreIn.value = '';
        dateIn.value = '';
        statutIn.value = '';


    }

}


const addButton = document.querySelector(".add-button");

let addButtonTimeout;
addButton.addEventListener('click', ()=>{

    addButton.disabled = true;

    addForm();

    clearTimeout(addButtonTimeout);

    addButtonTimeout = setTimeout(()=>{
       addButton.disabled = false;
    }, 500);

});


let searchTimeout;
let searchContainerTimeout;

function searchForm(){

    let trouve = false;
    let i = 0;

    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    while(i<formations.length && (!trouve)){
        if(formations[i].code === code){
            trouve = true;
        }else{
            i++;
        }

    }

    const msg = document.querySelector(".search-message");
    

    if(trouve){
        
        const container = document.querySelector(".display-search");
        container.innerHTML = '';

                const formDiv = document.createElement("div");
        formDiv.className = "formation-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${formations[i].code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last name : ${formations[i].nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First name : ${formations[i].prenom}`;

        const titreD = document.createElement("div");
        titreD.textContent = `- Title : ${formations[i].titre}`;

        const dateD = document.createElement("div");
        dateD.textContent = `- Date : ${formations[i].date}`;

        const statutD = document.createElement("div");
        statutD.textContent = `- Statut : ${formations[i].statut}`;

        formDiv.appendChild(codeD);
        formDiv.appendChild(nomD);
        formDiv.appendChild(prenomD);
        formDiv.appendChild(titreD);
        formDiv.appendChild(dateD);
        formDiv.appendChild(statutD);

        container.appendChild(formDiv);

        codeIn.value = '';

        clearTimeout(searchContainerTimeout);

        searchContainerTimeout = setTimeout(()=>{
            container.innerHTML = '';
        }, 3500);

        msg.style.color = "green";

        msg.innerHTML = 'Code found !';

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        }, 2000);

    }else{

        msg.style.color = "red";
        msg.innerHTML = "code not found";

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        }, 2000);

    }

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchForm();
});



let modifTimeout;
function modifForm(){

    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let prenomIn = document.querySelector(".m-prenom");
    let titreIn = document.querySelector(".m-titre");
    let dateIn = document.querySelector(".m-date");
    let statutIn = document.querySelector(".m-statut");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let titre = titreIn.value;
    let date = dateIn.value;
    let statut= statutIn.value;


    let trouve =  false;
    let i = 0;

    const msg = document.querySelector(".modif-message");
    msg.style.color = "red";

    if(code === '' || nom === '' || prenom === '' || titre === '' || date === '' || statut === ''){
         msg.innerHTML = 'Please enter all the necessary information';
    }else{

        while(i<formations.length && (!trouve)){
            if(formations[i].code === code){
                trouve = true;
                formations[i].nom = nom;
                formations[i].prenom = prenom;
                formations[i].titre = titre;
                formations[i].date = date;
                formations[i].statut = statut;
                displayForm();
            }else{
                i++;
            }

        }

        if(trouve){
            msg.style.color = "green";
            msg.innerHTML = 'Modification done with success &#9786;'
            clearTimeout(modifTimeout);

            modifTimeout = setTimeout(()=>{
                msg.innerHTML = '';
            }, 2000);

            nomIn.value = '';
            codeIn.value = '';
            prenomIn.value = '';
            titreIn.value = '';
            dateIn.value ='';
            statutIn.value = '';


        }else{
            msg.innerHTML = 'Code not found';
        }

        
    }
}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{
    modifForm();
});



let totalTimeout;

function displayTotal(){

    const totalMsg = document.querySelector(".display-total");

    totalMsg.innerHTML = `${formations.length}`;

    clearTimeout(totalTimeout);

    totalTimeout = setTimeout(()=>{
        totalMsg.innerHTML = '';

    }, 3000);

}


const totalButton = document.querySelector(".total-button");

totalButton.addEventListener('click', ()=>{
    displayTotal();
});



function nbrOn(){

    let cpt = 0;

    formations.forEach((f)=>{
        if(f.statut === 'ongoing'){
            cpt++;
        }
    });

    return cpt;
}


let ongoingTimeout;
function displayOngoing(){


    let numberOngoing = nbrOn();

    let ongoingMsg = document.querySelector(".display-ongoing");

    ongoingMsg.innerHTML = `${numberOngoing}`;

    clearTimeout(ongoingTimeout);

    ongoingTimeout = setTimeout(()=>{
        ongoingMsg.innerHTML = '';
    },3000);

}


const ongoingButton = document.querySelector(".ongoing-button");
ongoingButton.addEventListener('click', ()=>{
    displayOngoing();

});


function nbrCompleted(){

    let cpt = 0;

    formations.forEach((f)=>{
        if(f.statut === 'completed'){
            cpt++;
        }
    });


    return cpt;

}

let completedTimeout;


function displayCompleted(){


    let nbrComp = nbrCompleted();

    document.querySelector(".display-completed").innerHTML = `${nbrComp}`;

    clearTimeout(completedTimeout);

    completedTimeout = setTimeout(()=>{
        document.querySelector(".display-completed").innerHTML = '';
    }, 3000);

}


const completedButton = document.querySelector(".completed-button");

completedButton.addEventListener('click', ()=>{

    displayCompleted();

});



function sortForm(){

    formations.sort((a, b) => new Date(a.date) - new Date(b.date));

    const container = document.querySelector(".display-sort");
    container.innerHTML = '';


    formations.forEach((f)=>{

        const formDiv = document.createElement("div");
        formDiv.className = "formation-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${f.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last name : ${f.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First name : ${f.prenom}`;

        const titreD = document.createElement("div");
        titreD.textContent = `- Title : ${f.titre}`;

        const dateD = document.createElement("div");
        dateD.textContent = `- Date : ${f.date}`;

        const statutD = document.createElement("div");
        statutD.textContent = `- Statut : ${f.statut}`;



        formDiv.appendChild(codeD);
        formDiv.appendChild(nomD);
        formDiv.appendChild(prenomD);
        formDiv.appendChild(titreD);
        formDiv.appendChild(dateD);
        formDiv.appendChild(statutD);

        container.appendChild(formDiv);
        
    });


    
}

const sortButton = document.querySelector(".sort-button");

sortButton.addEventListener('click', ()=>{
    
    let container = document.querySelector(".display-sort");

    if(container.innerHTML ===''){
        sortForm();
    }else{
        container.innerHTML = '';
    }

});