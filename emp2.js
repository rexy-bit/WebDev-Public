const humburger = document.querySelector(".humburger");
const nav = document.querySelector("nav");



let navDisplay = JSON.parse(localStorage.getItem('navDisplay')) || "none";
nav.style.display = navDisplay;
humburger.addEventListener('click', ()=>{
    //e.stopPropagation();
    if(nav.style.display === 'none'){
          navDisplay = 'flex';
    }else{
        navDisplay = "none";
    }
   
    nav.style.display = navDisplay;
    localStorage.setItem("navDisplay", JSON.stringify(navDisplay));

});



function displayList(){

    fetch('http://localhost:3000/employes')
      .then(response => response.json())
        .then(data=>{
            console.log(data);


            const container = document.querySelector(".display-content");
            container.innerHTML = '';

              if(data.length === 0){
                        const displayMsg = document.querySelector(".liste-message");
                        displayMsg.style.color = "red";
                        displayMsg.innerHTML = 'No employe in the dataBase';
               }else{
                    data.forEach(emp => {
                        const empDiv = document.createElement("div");
                        empDiv.className = "emp-div";

                        empDiv.innerHTML = `
                            
                            <div>- Code : ${emp.code}</div>
                            <div>- Last name : ${emp.nom}</div>
                            <div>- First name : ${emp.prenom}</div>
                            <div>- Departement : ${emp.departement}</div>
                            <div>- Poste : ${emp.poste}</div>

                        `;

                        const deleteButton = document.createElement("button");
                        deleteButton.className = "delete-button";
                        deleteButton.textContent = "Delete";
                        deleteButton.addEventListener('click', ()=>{
                            deleteEmp(emp.id);
                        });

                        empDiv.appendChild(deleteButton);

                        container.appendChild(empDiv);
                    });

            }
        }).catch(error=>console.error('Error in displaying the data : ', error));
    
}


function deleteEmp(id){

    fetch(`http://localhost:3000/employes/${id}`, {
        method : 'DELETE'
    }).then(()=>{
        console.log(`Employe with id : ${id} deleted`);
        displayList();

    }).catch(error => console.error('Error in deleting : ', error));
    
}


displayList();



let addMsgTimeout;
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


    fetch('http://localhost:3000/employes')
      .then(response => response.json())
         .then(data=>{

            let trouve = data.find((emp)=> emp.code === code);

            const msg = document.querySelector(".add-message");
            msg.style.color = "red";

            if(trouve){
                msg.innerHTML = 'The code you entered already exists try another one';

                clearTimeout(addMsgTimeout);

                addMsgTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);


            }else if(!code || !nom || !prenom || !departement || !poste){
                msg.innerHTML = 'Please entrer all the necessary information';

                                clearTimeout(addMsgTimeout);

                addMsgTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);

            }else{

                const newEmp = {

                    code,
                    nom,
                    prenom,
                    departement,
                    poste
                };

                fetch('http://localhost:3000/employes', {
                    method : 'POST',
                    header : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(newEmp)
                }).then(response => response.JSON)
                 .then(()=>{

                    msg.style.color = "green";

                    msg.innerHTML = 'Employe added with success';

                clearTimeout(addMsgTimeout);

                addMsgTimeout = setTimeout(()=>{
                    msg.innerHTML = '';
                }, 2000);


                    displayList();

                    codeIn.value = '';
                    nomIn.value = '';
                    prenomIn.value = '';
                    departementIn.value = '';
                    posteIn.value = '';


                 }).catch(error => console.error('Error in adding : ', error));

            }

         }).catch(error => console.error('Error in adding function : ', error));

}


const addButton = document.querySelector(".add-button");

let disableButtonTimeout;
addButton.addEventListener('click', ()=>{
    addButton.disabled = true;

    addEmp();

    clearTimeout(disableButtonTimeout);

    disableButtonTimeout = setTimeout(()=>{
        addButton.disabled = false;
    });

});


let searchMsgtimeout;
let searchContainerTimeout;
function searchEmp(){


    let codeIn = document.querySelector(".search-code");
    let code = codeIn.value;

    fetch('http://localhost:3000/employes')
      .then(response => response.json())
      .then(data=>{

         let findEmp = data.find((emp)=>emp.code === code);

         const msg = document.querySelector(".search-message");

         if(findEmp){
            msg.style.color = "green";
            msg.innerHTML = 'Employe found';

            clearTimeout(searchMsgtimeout);

            searchMsgtimeout = setTimeout(()=>{
                msg.innerHTML = '';
            },2000);

            const container = document.querySelector(".display-search");

            container.innerHTML = '';

            const empDiv = document.createElement("div");
            empDiv.className = "emp-div";
            empDiv.innerHTML = `
                            <div>- Code : ${findEmp.code}</div>
                            <div>- Last name : ${findEmp.nom}</div>
                            <div>- First name : ${findEmp.prenom}</div>
                            <div>- Departement : ${findEmp.departement}</div>
                            <div>- Poste : ${findEmp.poste}</div>

            `;

            container.appendChild(empDiv);

            clearTimeout(searchContainerTimeout);

            searchContainerTimeout = setTimeout(()=>{
                container.innerHTML = '';
            }, 4000);

            codeIn.value = '';
         }else{
            msg.style.color = "red";
            msg.innerHTML = 'Code not found !';

            clearTimeout(searchMsgtimeout);

            searchMsgtimeout = setTimeout(()=>{
                msg.innerHTML = '';
            },2000);

            codeIn.value = '';

         }
      }).catch(error=> console.error('Error in search function : ', error));


}


const searchButton = document.querySelector(".search-button");

searchButton.addEventListener('click', ()=>{
    searchEmp();
});



let modifMsgTimeout;
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

  const msg = document.querySelector(".modif-message");
  msg.style.color = "red";

    if(!code || !nom || !prenom || !departement || !poste){
        msg.innerHTML = 'Please entrer all the necessary information';

        clearTimeout(modifMsgTimeout);
        modifMsgTimeout = setTimeout(()=>{
            msg.innerHTML = '';
        },2000);

    }else{

          fetch('http://localhost:3000/employes')
            .then(response => response.json())
              .then(data =>{
                  
                 let empModif = data.find((emp)=> emp.code === code);

                 if(empModif){

                    newEmp = {
                        code,
                        nom,
                        prenom,
                        departement,
                        poste
                    };

                    fetch(`http://localhost:3000/employes/${empModif.id}`, {
                        method : 'PUT',
                        header : {
                            'Content-type' : 'application/json'
                        },
                        body : JSON.stringify(newEmp)
                    }).then(response=>{
                        if(response.ok){

                             msg.style.color = "green";
                             msg.innerHTML = 'Modification done with success';

                             clearTimeout(modifMsgTimeout);
                             modifMsgTimeout = setTimeout(()=>{
                                msg.innerHTML = '';
                             },2000);
                        }else{
                            msg.style.color = 'red';
                            msg.innerHTML = 'An error occured';

                            clearTimeout(modifMsgTimeout);
                            modifMsgTimeout = setTimeout(()=>{
                                msg.innerHTML = '';
                             },2000);

                        }
                    }).catch(error=>console.error('Error in the modification : ', error));
                    
                 }else{

                    msg.innerHTML = 'Code not found';
                         clearTimeout(modifMsgTimeout);
                            modifMsgTimeout = setTimeout(()=>{
                                msg.innerHTML = '';
                             },2000);

                 }
              }).catch(error=> console.error('Error in fetching data : ', error));
    }

}


const modifButton = document.querySelector(".modif-button");

modifButton.addEventListener('click',()=>{
    modifEmp();
});



function displayNbrDep(){

    let nbrHr = 0;
    let nbrLogistics = 0;
    let nbrFinance = 0;
    let nbrProjects = 0; 
    let nbrTechincal = 0;
    let nbrIT = 0;
    fetch('http://localhost:3000/employes')
      .then(response => response.json())
        .then(data=>{

            data.forEach((emp)=>{
               
                switch(emp.departement){

                    case  'HR' : 
                      nbrHr++;
                      break;

                    case 'Logistics' : 
                       nbrLogistics++;
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

            const container = document.querySelector(".display-dep");
            container.innerHTML = `
                <div>- HR : ${nbrHr}</div>
                <div>- Logistics : ${nbrLogistics}</div>
                <div>- Finance : ${nbrFinance}</div>
                <div>- Projects : ${nbrProjects}</div>
                <div>- Technical : ${nbrTechincal}</div>
                <div>- IT : ${nbrIT}</div>
            `;


        }).catch(error => console.error('Error in display dep function : ', error));


}


displayNbrDep();


function displayTotal(){

    fetch('http://localhost:3000/employes')
      .then(response => response.json())
        .then(data =>{

            document.querySelector(".display-total").innerHTML = `${data.length}`;

        });
}

displayTotal();