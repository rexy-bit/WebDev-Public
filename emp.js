let emp = JSON.parse(localStorage.getItem('emp')) || [{
    code: '0',
    nom : 'Rezgui',
    prenom : 'Yanis',
    departement : 'Projects',
    poste : 'Interne'
}];


displayEmp();
function displayEmp(){

    const container = document.querySelector(".display-content");
    container.innerHTML = '';

    emp.forEach((element, i)=>{

        const empDiv = document.createElement("div");
        empDiv.className = "emp-div";
        
        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${element.code}`;

        const nomD = document.createElement("div");
        nomD.className = "nom";
        nomD.textContent = `- Last name : ${element.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- Prenom : ${element.prenom}`;

        const departementD = document.createElement("div");
        departementD.textContent = `- Departement : ${element.departement}`;

        const posteD = document.createElement("div");
        posteD.textContent = `- Poste : ${element.poste}`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener('click', ()=>{
            emp.splice(i, 1);
            displayEmp();
        });


        empDiv.appendChild(codeD);
        empDiv.appendChild(nomD);
        empDiv.appendChild(prenomD)
        empDiv.appendChild(departementD);
        empDiv.appendChild(posteD);
        empDiv.appendChild(deleteButton);


        container.appendChild(empDiv);
        });

        localStorage.setItem('emp', JSON.stringify(emp));

}

let timeId;
function addEmp(){


    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let prenomIn = document.querySelector(".input-prenom");
    let departementIn = document.querySelector(".input-departement");
    let posteIn = document.querySelector(".input-poste");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let departement = departementIn.value;
    let poste = posteIn.value;


    let trouve = false;
    let i = 0;
    
    while(i<emp.length && (!trouve)){

        if(emp[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){

        document.querySelector(".display-error-message").innerHTML  = 'The code you entered already exists';
    }else if(code === '' || nom === '' || prenom === '' || departement === '' || poste === ''){

         document.querySelector(".display-error-message").innerHTML  = 'Please enter all the necessary information';
        
    }else{

         document.querySelector(".display-error-message").innerHTML  = '';

         emp.push({
            code,
            nom,
            prenom,
            departement,
            poste
         });

         displayEmp();


         document.querySelector(".display-success-message").innerHTML  = 'Employee added with success';

         clearTimeout(timeId);

         timeId = setTimeout(()=>{
             document.querySelector(".display-success-message").innerHTML  = '';
        }, 2000);

        codeIn.value = '';
        nomIn.value = '';
        prenomIn.value = '';
        departementIn.value = '';
        posteIn.value = '';
        
    }

}

let addTime;

const addButton = document.querySelector(".add-button");


addButton.addEventListener('click', ()=>{
   
    addButton.disabled = true;

    addEmp();

    clearTimeout(addTime);

    addTime = setTimeout(()=>{
        addButton.disabled = false;
    }, 500);
});

let timeId1;
let timeId2;
function searchEmp(){

    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    let trouve = false;
    let i = 0;

    while(i<emp.length && (!trouve)){

        if(emp[i].code === code){
            trouve = true;

        }else{
            i++;
        }
    }

    if(trouve){

        document.querySelector(".search-message").innerHTML = 'Employee found !';

        clearTimeout(timeId1);

        timeId1 = setTimeout(()=>{
             document.querySelector(".search-message").innerHTML = '';
        }, 2500);


        let container = document.querySelector(".display-search");
        container.innerHTML = '';

        const empD = document.createElement("div");
        empD.className = "emp-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${emp[i].code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last name : ${emp[i].nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First name : ${emp[i].prenom}`;

        const departementD = document.createElement("div");
        departementD.textContent = `- Departement : ${emp[i].departement}`;

        const posteD = document.createElement("div");
        posteD.textContent = `- Poste : ${emp[i].poste}`;

        empD.appendChild(codeD);
        empD.appendChild(nomD);
        empD.appendChild(prenomD);
        empD.appendChild(departementD);
        empD.appendChild(posteD);

        container.appendChild(empD);

        clearTimeout(timeId2);

        timeId2 = setTimeout(()=>{
            container.innerHTML = '';
        },4000);

        codeIn.value = '';
        
    }else{

        document.querySelector(".search-message").innerHTML = 'Employee not found';

        clearTimeout(timeId1);

        timeId1 = setTimeout(()=>{
            document.querySelector(".search-message").innerHTML = '';
        }, 2500);

    }
}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchEmp();
});


let timeId3;
function modifEmp(){

    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let prenomIn = document.querySelector(".m-prenom");
    let departementIn = document.querySelector(".m-departement");
    let posteIn = document.querySelector(".m-poste");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let departement = departementIn.value;
    let poste = posteIn.value;

    let trouve = false;
    let i = 0;

    while(i<emp.length && (!trouve)){

        if(emp[i].code === code){
            trouve = true;

        }else{
            i++;
        }

    }

    if(!trouve){
        document.querySelector(".modif-message").innerHTML = 'Employee not found';
    }else if(code === '' || prenom === '' || nom === '' || departement === '' || poste === ''){
        document.querySelector(".modif-message").innerHTML = 'Please enter all the necessary information';
    }else{

        document.querySelector(".modif-message").innerHTML = '';

        emp[i].nom = nom;
        emp[i].prenom = prenom;
        emp[i].departement = departement;
        emp[i].poste = poste;

        displayEmp();

        document.querySelector(".modif-message").innerHTML = 'Modification done with success';

        clearInterval(timeId3);

        timeId3 = setTimeout(()=>{
            document.querySelector(".modif-message").innerHTML = '';
        }, 2000);

        codeIn.value = '';
        nomIn.value = '';
        prenomIn.value = '';
        departementIn.value = '';
        posteIn.value = '';
    }
}


const modifButton = document.querySelector(".modif-button");


modifButton.addEventListener('click', ()=>{

    modifButton.disabled = true;

    modifEmp();

    clearTimeout(addTime);

    addTime = setTimeout(()=>{
       modifButton.disabled = false;
    }, 500);

});


let totalTime;

function displayTotalEmp(){


    document.querySelector(".display-total").innerHTML = `${emp.length}`;

    clearTimeout(totalTime);

    totalTime = setTimeout(()=>{
        document.querySelector(".display-total").innerHTML = '';
    }, 3000);
}


document.querySelector(".total-button").addEventListener('click', ()=>{
    displayTotalEmp();
});



function nbrHr(){

    let cpt = 0;

    emp.forEach((element)=>{
        if(element.departement === 'HR' ){
            cpt++;
        }
    });

    return cpt;
}


function nbrLog(){

    let cpt = 0;

        emp.forEach((element)=>{
        if(element.departement === 'Logistics' ){
            cpt++;
        }
    });

    return cpt;
}


function nbrPro(){

    let cpt = 0;

        emp.forEach((element)=>{
        if(element.departement === 'Projects' ){
            cpt++;
        }
    });

    return cpt;
}


function nbrTec(){

    let cpt = 0;

        emp.forEach((element)=>{
        if(element.departement === 'Technical' ){
            cpt++;
        }
    });

    return cpt;
}


function nbrF(){

    let cpt = 0;


   emp.forEach((element)=>{
        if(element.departement === 'Finance' ){
            cpt++;
        }
    });

    return cpt;
}



function displayNbr(){

    let nbrH = nbrHr();
    let nbrP = nbrPro();
    let nbrFi = nbrF();
    let nbrL = nbrLog();
    let nbrT = nbrTec();


    document.querySelector(".nbr-hr").innerHTML = `${nbrH}`;
    document.querySelector(".nbr-pro").innerHTML = `${nbrP}`;
    document.querySelector(".nbr-log").innerHTML= `${nbrL}`;
    document.querySelector(".nbr-fi").innerHTML = `${nbrFi}`;
    document.querySelector(".nbr-tec").innerHTML = `${nbrT}`;
}

displayNbr();