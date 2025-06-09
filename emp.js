
let emp = JSON.parse(localStorage.getItem('emp')) || [{
    code : '01',
    nom : 'Rezgui',
    prenom  :'Yanis',
    age : '19',
    salaire : '0'
}];

displayEmp();
function displayEmp(){

    let empHtml = '';

    for(let i = 0;i<emp.length;i++){

        let html = `
        
            <div class="emp">
                <p class="code">${emp[i].code}</p>
                <p class="nom">${emp[i].nom}</p>
                <p class="prenom">${emp[i].prenom}</p>
                <p class="age">${emp[i].age}</p>
                <p class="salaire">${emp[i].salaire} &euro;</p>

                <button class="delete-button" onclick="
                   emp.splice(${i}, 1);
                   displayEmp();
                ">
                   Delete
                </button>
            </div>

        `;

        empHtml+=html;
    }

    document.querySelector(".display-content").innerHTML = empHtml;

    localStorage.setItem('emp', JSON.stringify(emp));


}

function addEmp(){
    
    let codeInput = document.querySelector(".input-code");
    let nomInput = document.querySelector(".input-nom");
    let prenomInput = document.querySelector(".input-prenom");
    let ageInput = document.querySelector(".input-age");
    let salaireInput = document.querySelector(".input-salaire");

    let code = codeInput.value;
    let nom = nomInput.value;
    let prenom =  prenomInput.value;
    let age = ageInput.value;
    let salaire = salaireInput.value;

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
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists try another one !';
    }else if(code === '' || nom === '' || prenom === '' || age === '' || salaire === ''){
           document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(age) || isNaN(salaire)){
           document.querySelector(".display-error-message").innerHTML = 'Please the salary and age must contain only numbers';
    }else if(age < 0 || salaire < 0){
           document.querySelector(".display-error-message").innerHTML = 'Salary and age must be positive';
            }else{
               
                   document.querySelector(".display-error-message").innerHTML = '';
                emp.push({
                    code,
                    nom,
                    prenom,
                    age,
                    salaire
                });

                displayEmp();

                   document.querySelector(".display-success-message").innerHTML = 'Emp added successfuly';

                   setTimeout(()=>{
                    document.querySelector(".display-success-message").innerHTML = '';
                   }, 3000);


                   codeInput.value = '';
                   nomInput.value = '';
                   prenomInput.value = '';
                   ageInput.value = '';
                   salaireInput.value = '';

            }
    
}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addEmp();
});



function searchEmp(){

    let codeInput = document.querySelector(".search-code");
    let code = codeInput.value;

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
        document.querySelector(".search-result").innerHTML = 'Employe found';

        setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        }, 3000);


        document.querySelector(".s-code").innerHTML = `${emp[i].code}`;
         document.querySelector(".s-nom").innerHTML = `${emp[i].nom}`;
          document.querySelector(".s-prenom").innerHTML = `${emp[i].prenom}`;
           document.querySelector(".s-age").innerHTML = `${emp[i].age}`;
            document.querySelector(".s-salaire").innerHTML = `${emp[i].salaire}`;

            setTimeout(()=>{
                        document.querySelector(".s-code").innerHTML = '';
         document.querySelector(".s-nom").innerHTML = '';
          document.querySelector(".s-prenom").innerHTML = '';
           document.querySelector(".s-age").innerHTML = '';
            document.querySelector(".s-salaire").innerHTML = '';
            }, 3000);

    }else{
         document.querySelector(".search-result").innerHTML = 'Code not found';
    }

    codeInput.value ='';
}

document.querySelector(".search-button").addEventListener('click', ()=>{
    searchEmp();
});


function calculateMean(){

    let S = 0;
    let cpt = 0;

    let M;

    for(let i=0;i<emp.length;i++){
        S += Number(emp[i].salaire);
        cpt++;
    }

    if(cpt!=0){
       M = S/cpt;
    }else{
        return 0;
    }

    return M.toFixed(2);
}


function displayMean(){

    let moy = calculateMean();

    document.querySelector(".display-mean").innerHTML = `${moy} &euro;`;

    setInterval(()=>{
   
 document.querySelector(".display-mean").innerHTML = '';
    }, 5000);

}

document.querySelector(".mean-button").addEventListener('click', ()=>{
    displayMean();
});

function findMax(){

    let max = emp[0];

    for(let i = 1;i<emp.length;i++){
        if(Number(max.salaire) < Number(emp[i].salaire)){
            max = emp[i];
        }
    }

    return max;

}

function displayMax(){

    let max = findMax();

    if(max != null){
        document.querySelector(".max-code").innerHTML = `${max.code}`;
         document.querySelector(".max-nom").innerHTML = `${max.nom}`;
          document.querySelector(".max-prenom").innerHTML = `${max.prenom}`;
           document.querySelector(".max-age").innerHTML = `${max.age}`;
            document.querySelector(".max-salaire").innerHTML = `${max.salaire}`;


            setTimeout(()=>{
                       document.querySelector(".max-code").innerHTML = '';
         document.querySelector(".max-nom").innerHTML = '';
          document.querySelector(".max-prenom").innerHTML = '';
           document.querySelector(".max-age").innerHTML = '';
            document.querySelector(".max-salaire").innerHTML = '';
            }, 5000);
    }
}

document.querySelector(".max-button").addEventListener('click', ()=>{
    displayMax();
});


function findMin(){

    let min = emp[0];

    for(let i = 1;i<emp.length;i++){
        if(Number(emp[i].salaire) < Number(min.salaire)){
            min = emp[i];
        }
    }

    return min;
}

function displayMin(){

    let min = findMin();

    if(min != null){

        document.querySelector(".min-code").innerHTML = `${min.code}`;
        document.querySelector(".min-nom").innerHTML = `${min.nom}`;
        document.querySelector(".min-prenom").innerHTML = `${min.prenom}`;
        document.querySelector(".min-age").innerHTML = `${min.age}`;
        document.querySelector(".min-salaire").innerHTML = `${min.salaire}`;


        setTimeout(()=>{

              document.querySelector(".min-code").innerHTML = '';
        document.querySelector(".min-nom").innerHTML =  '';
        document.querySelector(".min-prenom").innerHTML =  '';
        document.querySelector(".min-age").innerHTML =  '';
        document.querySelector(".min-salaire").innerHTML =  '';
        }, 5000);

    }
}

document.querySelector(".min-button").addEventListener('click', ()=>{
    displayMin();
});




function sortEmp(){

    for(let i =0;i<emp.length-1;i++){

        for(let j = i+1;j<emp.length;j++){
            if(Number(emp[i].salaire) > Number(emp[j].salaire)){
                let temp = emp[i];
                emp[i] = emp[j];
                emp[j] = temp;
            }
        }

    }
    
    let sortHtml= '';

    for(let i = 0;i<emp.length;i++){
        
        let html = `
                     <div class="emp">
                           <p class="code">${emp[i].code}</p>
                <p class="nom">${emp[i].nom}</p>
                <p class="prenom">${emp[i].prenom}</p>
                <p class="age">${emp[i].age}</p>
                <p class="salaire">${emp[i].salaire} &euro;</p>

                </div>
        
        `;

        sortHtml += html;
    }

    document.querySelector(".display-sort").innerHTML = sortHtml;

    setTimeout(()=>{
        document.querySelector(".display-sort").innerHTML = '';
    }, 10000);

}

document.querySelector(".sort-button").addEventListener('click', ()=>{
    sortEmp();
});