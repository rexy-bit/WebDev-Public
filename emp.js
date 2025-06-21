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

document.querySelector(".add-button").addEventListener('click', ()=>{
    addEmp();
});