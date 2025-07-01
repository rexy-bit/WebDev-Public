const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");

let display = JSON.parse(localStorage.getItem('display'));
nav.style.display = display;
humburger.addEventListener('click', ()=>{
    if(nav.style.display === 'none'){
        nav.style.display = 'flex';

    }else{
        nav.style.display = 'none';
    }

    display = nav.style.display;
    localStorage.setItem('display', JSON.stringify(display));

});



function displayMat(){


    fetch('http://localhost:3000/materiels')
      .then(response => response.json())
        .then(data =>{

            console.log(data);

            const container = document.querySelector(".display-content");
            container.innerHTML = '';

            data.forEach((mat)=>{

                const matDiv = document.createElement("div");

                matDiv.className = "mat-div";
                matDiv.innerHTML = `
                   <div>- Code : ${mat.code}</div>
                   <div>- Name : ${mat.nom}</div>
                   <div>- Type : ${mat.type}</div>
                   <div>- State : ${mat.state}</div>
                   <div>- Departement : ${mat.departement}</div>

                `;

                const deleteButton = document.createElement("button");

                deleteButton.className = "delete-button";

                deleteButton.textContent = "Delete";

                deleteButton.addEventListener('click', ()=>{
                    if(confirm(`Are you sure to delete material : ${mat.id} ?`)){
                        deleteMat(mat.id);
                    }
                });

                matDiv.appendChild(deleteButton);

                container.appendChild(matDiv);

            });

        }).catch(error => console.error('Error in fetching data for display function : ', error)); 

}

displayMat();


function deleteMat(id){

    fetch(`http://localhost:3000/materiels/${id}`, {
        method : 'DELETE'
    }).then(()=>{
        console.log(`Employe with Id : ${id} deleted`);
        displayMat();
    }).catch(error=> console.error('Error in Deleting', error));
    
}


let addTimeout;
function addMat(){

    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let typeIn = document.querySelector(".input-type");
    let stateIn = document.querySelector(".input-state");
    let depIn = document.querySelector(".input-departement");

    let code = codeIn.value;
    let nom = nomIn.value;
    let type = typeIn.value;
    let state = stateIn.value;
    let dep = depIn.value;


    fetch('http://localhost:3000/materiels')
      .then(response => response.json())
        .then(data=>{
            
            let trouve = data.find((mat)=> mat.code === code );

            const msg = document.querySelector
            (".add-message");
            msg.style.color = "red";
            if(!code || !nom || !type || !state || !dep){
                msg.innerHTML = 'Please enter all the necessary information';

                clearTimeout(addTimeout);

                addTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);
            }else if(trouve){
                msg.innerHTML = 'The code you entered already exists please try another one';

             clearTimeout(addTimeout);

                addTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);
            }else{


                const newMat = {
                    code,
                    nom,
                    type,
                    state,
                    departement : dep
                };

                fetch('http://localhost:3000/materiels', {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },

                    body : JSON.stringify(newMat)
                    
                }).then(response => response.json()).then(data=>{

                    msg.style.color = "green";

                    msg.innerHTML = 'Material added with success';

                clearTimeout(addTimeout);

                addTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);
                       
                }).catch(error => console.error('Error in adding the Material : ', error));


            }

        }).catch(error => console.error('Error in add function : ', error));


}


const addButton = document.querySelector(".add-button");


let addButtonTimeout;
addButton.addEventListener('click', ()=>{
    addMat();

    addButton.disabled = true;

    clearTimeout(addButtonTimeout);
    addButtonTimeout = setTimeout(()=>{
        addButton.disabled = false;
    }, 1000);

});



let searchTimeout;
let searchContainerTimeout;

function searchMat(){


    let codeIn = document.querySelector(".search-code");

    let code = codeIn.value;

    fetch('http://localhost:3000/materiels')
      .then(response => response.json())
        .then(data =>{

            let trouve = data.find((mat)=> mat.code === code);

            const msg = document.querySelector(".search-message");

            if(trouve){
                msg.style.color = "green";
                msg.innerHTML = 'Material found !';

                 clearTimeout(searchTimeout);

                 searchTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                 }, 2000);


                 const container = document.querySelector(".display-search");

                 container.innerHTML = '';

                 const matDiv = document.createElement("div");

                 matDiv.className = 'mat-div';
                 matDiv.innerHTML = `
                   <div>- Code : ${trouve.code}</div>
                   <div>- Name : ${trouve.nom}</div>
                   <div>- Type : ${trouve.type}</div>
                   <div>- State : ${trouve.state}</div>
                   <div>- Departement : ${trouve.departement}</div>
                 `;

                 container.appendChild(matDiv);

                 clearTimeout(searchContainerTimeout);

                 searchContainerTimeout = setTimeout(()=>{
                    container.innerHTML = '';
                 }, 4000);


            }else{

                msg.style.color = "red";

                msg.innerHTML = 'Code not found';

                clearTimeout(searchTimeout);

                searchButton = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);

            }

        }).catch(error => console.error('Error in searching : ', error));

}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchMat();

});



let modifTimeout;
function modifMat(){

    let codeIn = document.querySelector(".m-code");
    let nomIn = document.querySelector(".m-nom");
    let typeIn = document.querySelector(".m-type");
    let stateIn = document.querySelector(".m-state");
    let depIn = document.querySelector(".m-departement");

    let code = codeIn.value;
    let nom = nomIn.value;
    let type = typeIn.value;
    let state = stateIn.value;
    let dep = depIn.value;


    const msg = document.querySelector(".modif-message");
   msg.style.color = "red";

    fetch('http://localhost:3000/materiels')
      .then(response => response.json())
        .then(data=>{

            let trouve = data.find((emp)=> emp.code === code);

            if(!code || !nom || !type || !state || !dep){

               msg.innerHTML = 'Please enter all the necessary information';

            }else if(trouve){


                const newEmp = {
                    code,
                    nom,
                    type,
                    state,
                    departement : dep
                };

                fetch(`http://localhost:3000/materiels/${trouve.id}`, {
                    method : 'PUT',

                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(newEmp)

                }).then((data)=>{

                    msg.style.color = "green";
                    msg.innerHTML = 'Modification done with success';

                    clearTimeout(modifTimeout);

                    modifTimeout = setTimeout(()=>{
                         msg.innerHTML = '';
                    }, 2000);

                    
                }).catch(error => console.error('Error in modification : ', error));


            }else{

                msg.innerHTML = 'Code not found';

            }


        }).catch(error=> console.error('Error in modification function : ', error));


}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click', ()=>{
    modifMat();
});



function displayTotal(){


    fetch('http://localhost:3000/materiels')
     .then(response => response.json())
      .then(data =>{

          document.querySelector(".display-total").innerHTML = `${data.length}`;

      });

}


displayTotal();



function eachDep(){

    let nbrRh = 0;
    let nbrLog = 0;
    let nbrProjects = 0;
    let nbrFinance = 0;
    let nbrIT = 0;
    let nbrTechincal = 0;
    
    fetch('http://localhost:3000/materiels')
     .then(response => response.json())
       .then(data=>{

          const container = document.querySelector(".display-each");

          container.innerHTML = '';

          data.forEach((mat)=>{
            switch(mat.departement){
               
                case 'HR' : 
                  nbrRh++;
                  break;

                case 'Logistics' : 
                    nbrLog++;
                    break;

                case 'Finance' : 
                   nbrFinance++;
                   break;

                case 'Projects' : 
                  nbrProjects++;
                  break;

                case 'Technical' : 
                   nbrTechincal++;
                   break;

                case 'IT' : 
                   nbrIT++;
                   break;
            }
          });


          container.innerHTML = `
             <div>- HR : ${nbrRh}</div>
             <div>- Logistics : ${nbrLog}</div>
             <div>- Projects : ${nbrProjects}</div>
             <div>- Finance : ${nbrFinance}</div>
             <div>- Technical : ${nbrTechincal}</div>
             <div>- IT : ${nbrIT}</div>
          `;

       }).catcht(error => console.error('Error in fetching data in eachDep : ', error));


}


eachDep();


