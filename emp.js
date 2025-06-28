const navBar = document.querySelector("nav");
const humburger = document.querySelector(".humburger");

navBar.style.display = "none";

humburger.addEventListener('click', ()=>{
    if(navBar.style.display === 'none'){
        navBar.style.display = "flex";
    }else{
        navBar.style.display = "none";
    }
});


function displayEmp(){

     fetch('http://localhost:3000/employes')
     .then(response=>response.json())
     .then(data=>{
        console.log(data);

        const container = document.querySelector(".display-content");
        container.innerHTML = '';

        data.forEach(emp => {
        
            const empDiv = document.createElement("div");
            empDiv.className = "emp-div";

            const codeD = document.createElement("div");
            codeD.textContent = `- Code : ${emp.code}`;

            const nomD = document.createElement("div");
            nomD.textContent = `- Last name : ${emp.nom}`

            const prenomD = document.createElement("div");
            prenomD.textContent = `-First name : ${emp.prenom}`;

            const posteD = document.createElement("div");
            posteD.textContent = `- Poste : ${emp.poste}`;

            const salaireD = document.createElement("div");
            salaireD.textContent = `- Salary : ${emp.salaire} Da`;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener('click', ()=>{
                if(confirm(`Are you sure to delete employe with id : ${emp.id} ?`)){
                    deleteEmp(emp.id);
                }
            });

            empDiv.appendChild(codeD);
            empDiv.appendChild(nomD);
            empDiv.appendChild(prenomD);
            empDiv.appendChild(posteD);
            empDiv.appendChild(salaireD);
            empDiv.appendChild(deleteButton);

   container.appendChild(empDiv);
        });
     })
      .catch(error=>console.error('Error in display : ', error));
     
}

displayEmp();


function deleteEmp(id){

    fetch(`http://localhost:3000/employes/${id}`, {
        method : 'DELETE'
    }).then(()=>{
        console.log(`Employe avec Id : ${id} Supprime`);
        displayEmp();
    }
    ).catch(error=> console.log('Error in deleting : ', error));

}


let addTimeout;
function addEmp(){


    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let prenomIn = document.querySelector(".input-prenom");
    let posteIn = document.querySelector(".input-poste");
    let salaireIn = document.querySelector(".input-salaire");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let poste = posteIn.value;
    let salaire = salaireIn.value;


    let trouve = false;

    const msg = document.querySelector(".add-message");
    msg.style.color = "red";

    fetch('http://localhost:3000/employes')
    .then(response =>response.json())
    .then(data=>{

        data.forEach((emp)=>{
            if(emp.code === code){
                trouve = true;
                return;
            }
        });


        if(trouve){
            msg.innerHTML = 'The code you entered already exists please try another one';
        }else if(code === '' || nom === '' || prenom === '' || poste === '' || salaire === ''){
            msg.innerHTML = 'Please enter all the necessary information';
        }else if(isNaN(salaire) || Number(salaire) < 0){
              msg.innerHTML = 'The salary must be a positive number';
        }else{

            msg.innerHTML = '';

            const newEmp = {
                code,
                nom,
                prenom,
                poste,
                salaire : Number(salaire)
            };

            fetch('http://localhost:3000/employes', {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(newEmp)
            }).then(response => response.json())
                .then(data=>{
                    console.log('Employe added with success : ', data);
                    displayEmp();
                    codeIn.value = '';
                    nomIn.value = '';
                    prenomIn.value ='';
                    posteIn.value = '';
                    salaireIn.value ='';

                    clearTimeout(addTimeout);

                    msg.style.color = "green";

                    msg.innerHTML = 'Employe added with success';

                    addTimeout = setTimeout(()=>{
                        msg.innerHTML= '';
                    }, 2000);

                }).catch(error=> console.error('Erreur lors de l\'ajout : ', error));
        }
    })
    .catch(error=>console.error('Error in cheking the existence of codeIn : ', error));


}


const addButton = document.querySelector(".add-button");

let addButtonTimeout;
addButton.addEventListener('click', ()=>{
     addButton.disabled = true;

     addEmp();

     clearTimeout(addButtonTimeout);

     addButtonTimeout = setTimeout(()=>{
        addButton.disabled = false;
     }, 500);
});


let searchTimeout;

let containerTimeout;
function searchEmp(){

    let trouve = false;
    let msg = document.querySelector(".search-message");

    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;


    fetch('http://localhost:3000/employes')
     .then(response => response.json())
       .then(data=>{

        console.log(data);
        let findEmp;

          data.forEach(emp=>{
             if(emp.code === code){
                trouve = true;
                findEmp = emp;
                return;
             }
          });

          if(trouve){
             msg.style.color = "green";
             msg.innerHTML = "employe found !";

             clearTimeout(searchTimeout);

             searchTimeout = setTimeout(()=>{
                msg.innerHTML = '';
             }, 2000);

             const container = document.querySelector(".display-search");
             container.innerHTML = '';

               const empDiv = document.createElement("div");
            empDiv.className = "emp-div";

            const codeD = document.createElement("div");
            codeD.textContent = `- Code : ${findEmp.code}`;

            const nomD = document.createElement("div");
            nomD.textContent = `- Last name : ${findEmp.nom}`

            const prenomD = document.createElement("div");
            prenomD.textContent = `-First name : ${findEmp.prenom}`;

            const posteD = document.createElement("div");
            posteD.textContent = `- Poste : ${findEmp.poste}`;

            const salaireD = document.createElement("div");
            salaireD.textContent = `- Salary : ${findEmp.salaire} Da`;

            empDiv.appendChild(codeD);
            empDiv.appendChild(nomD);
            empDiv.appendChild(prenomD);
            empDiv.appendChild(posteD);
            empDiv.appendChild(salaireD);
            
            container.appendChild(empDiv);

            clearTimeout(containerTimeout);

            containerTimeout = setTimeout(()=>{
                container.innerHTML = '';
            }, 4000);

            codeIn.value = '';
          }else{
            msg.style.color = "red";
            msg.innerHTML = 'Code not found';
          }

       }).catch(error=>console.error('Error is search function : ', error));

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchEmp();
});


let modifTimeout;

function modifEmp(){

    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let prenomIn = document.querySelector(".m-prenom");
    let posteIn = document.querySelector(".m-poste");
    let salaireIn = document.querySelector(".m-salaire");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let poste = posteIn.value;
    let salaire = salaireIn.value;


    const msg = document.querySelector(".modif-message");
    msg.style.color = "red";
    
    fetch('http://localhost:3000/employes')
     .then(response =>response.json())
     .then(data=>{

         let trouve = data.find(emp=> emp.code === code);

         if(!trouve){
            msg.innerHTML = 'Code not found';
         }else if(code === '' || nom === '' || prenom === '' || poste === '' || salaire === ''){
             msg.innerHTML = 'Enter all the necessary information';
         }else if(isNaN(salaire) || Number(salaire) < 0){
            msg.innerHTML = 'Please the salary must be a positive number';
         }else{

            msg.innerHTML = '';

            const empModif = {
                code,
                nom,
                prenom,
                poste,
                salaire : Number(salaire)
            };

            fetch(`http://localhost:3000/employes/${trouve.id}`, {
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(empModif)
            })
            .then(response => {
                if(response.ok){
                    msg.style.color = "green";

                    clearTimeout(modifTimeout);
                    msg.innerHTML = "Employee updated successfuly";

                    modifTimeout = setTimeout(()=>{
                        msg.innerHTML = '';
                    }, 2000);
                    displayEmp();
                }else{
                    msg.style.color = "red";
                    msg.innerHTML = "an error occured";
                }
            })
            .catch(error=>{
                console.error('Error in update : ', error);

                msg.style.color = "red";
                msg.innerHTML = "Error in update check the console";
            });
         }
     }).catch(error=>console.error('Error in fetching data : ', error));

}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{
    modifEmp();
});


