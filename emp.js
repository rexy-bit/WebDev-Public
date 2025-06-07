let emp = JSON.parse(localStorage.getItem('emp')) || [{
    code : '0',
    nom : 'Rezgui',
    prenom : 'Yanis',
    age : '19',
    salaire : '0',


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
               <p class="salaire">${emp[i].salaire} &#8364;</p>

               <button class="delete-button" onclick="
                  emp.splice(${i}, 1);
                  displayEmp();
               ">
                  Delete
               </button>
           </div>
        `;

        empHtml += html;
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
    let prenom = prenomInput.value;
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

    if(Number(salaire) < 0 || Number(age) < 0){
        document.querySelector(".display-error-message").innerHTML = 'Please the salary and age must be positive numbers';

        return 0;
    }

    if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists please try another one !';
    }else if(code === '' || nom === '' || prenom === '' || age === '' || salaire === ''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the information';
    }else if(isNaN(age)){
          document.querySelector(".display-error-message").innerHTML = 'please the age must be a number !';
    }else if(isNaN(salaire)){
          document.querySelector(".display-error-message").innerHTML = 'Please the salary must be only numbers';
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

          document.querySelector(".display-success-message").innerHTML = 'Employee added successfuly';

          setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
          }, 3000);
    }
}

const addButton = document.querySelector(".add-button");

addButton.addEventListener('click', ()=>{
    addEmp();
});


function searchEmp(){
    
    let trouve = false;

    let codeInput = document.querySelector(".input-code-search");
    let code = codeInput.value;

    let i = 0;
    
    while(i<emp.length && (!trouve)){

        if(emp[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        
        document.querySelector(".display-success-search").innerHTML = 'Employee found';

        setTimeout(()=>{
            document.querySelector(".display-success-search").innerHTML = '';
        }, 3000);


        document.querySelector(".search-code").innerHTML = `${emp[i].code}`;
       document.querySelector(".search-nom").innerHTML = `${emp[i].nom}`;
       document.querySelector(".search-prenom").innerHTML = `${emp[i].prenom}`;
       document.querySelector(".search-age").innerHTML = `${emp[i].age}`;
       document.querySelector(".search-salaire").innerHTML = `${emp[i].salaire} &#8364;`;

       codeInput.value = '';

   setTimeout(()=>{
      document.querySelector(".search-code").innerHTML = '';
       document.querySelector(".search-nom").innerHTML = '';
       document.querySelector(".search-prenom").innerHTML = '';
       document.querySelector(".search-age").innerHTML = '';
       document.querySelector(".search-salaire").innerHTML = '';
   }, 5000);


   
        
    }else{
        document.querySelector(".display-error-search").innerHTML = 'Employee not found';

        setTimeout(()=>{
document.querySelector(".display-error-search").innerHTML = '';
        }, 3000);
    }

}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchEmp();
});

function calculateMean(){

  

    let S =0;
    let cpt = 0;
    let moy;
 
   
    for(let i = 0;i<emp.length;i++){

        S += Number(emp[i].salaire);
        cpt+=1;
    }

    if(cpt!=0){
         moy = S/cpt;
    }else{
        return 0;
    }

    return moy.toFixed(2);

}

function displayMoy(){

    let moy = calculateMean();

    document.querySelector(".display-mean").innerHTML = `${moy} &#8364;`;

    setTimeout(()=>{
        document.querySelector(".display-mean").innerHTML = '';
    }, 5000);
}

document.querySelector(".mean-button").addEventListener('click', ()=>{
    displayMoy();
});

function findMax(){

    let max = emp[0];

    for(let i =1;i<emp.length;i++){

        if(Number(emp[i].salaire) > Number(max.salaire)){
             max = emp[i];
        }
    }

    return max;
}


function findMin(){

    let min = emp[0];

    for(let i = 1;i<emp.length;i++){
           if(Number(emp[i].salaire) < Number(min.salaire)){
               min = emp[i];
           }
    }

    return min;
}


function sort(){
  
    let sortHtml = '';

    for(let i = 0;i<emp.length-1;i++){
        for(let j = i+1;j<emp.length;j++){
            if(Number(emp[i].salaire) > Number(emp[j].salaire)){
                let temp = emp[i];
                emp[i] = emp[j];
                emp[j]= temp;
            }
        }
    }

    for(let i = 0;i<emp.length;i++){
        let html = `
            <div class="emp">
              
               <p class="code">${emp[i].code}</p>
               <p class="nom">${emp[i].nom}</p>
               <p class="prenom">${emp[i].prenom}</p>
               <p class="age">${emp[i].age}</p>
               <p class="salaire">${emp[i].salaire} &#8364;</p>

           </div>
        `;

        sortHtml += html;
    }

    document.querySelector(".display-content").innerHTML = sortHtml;
}