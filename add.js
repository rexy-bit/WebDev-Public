let etud = JSON.parse(localStorage.getItem('etud')) || [];


function addEtud(){

    let codeIn = document.querySelector(".input-code");
    let nomIn = document.querySelector(".input-nom");
    let prenomIn = document.querySelector(".input-prenom");
    let ageIn = document.querySelector(".input-age");
    let moyIn = document.querySelector(".input-moy");

    let code = codeIn.value;
    let nom = nomIn.value;
    let prenom = prenomIn.value;
    let age = ageIn.value;
    let moy = moyIn.value;


    let trouve = false;
    let i = 0;

    while(i<etud.length && (!trouve)){
        if(etud[i].code === code){
            trouve = true;
        }else{
            i++;
        }
    }

    if(trouve){
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists';
    }else if(code === '' || nom === '' || prenom === '' || age === '' || moy === ''){
         document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary inforamtions';
    }else if(isNaN(age) || isNaN(moy)){
         document.querySelector(".display-error-message").innerHTML = 'The age and mean must contain only numbers';
    }else if(Number(age) < 0){
         document.querySelector(".display-error-message").innerHTML = 'Please the age must be positive';
    }else if(Number(moy) < 0 || Number(moy)>20){
         document.querySelector(".display-error-message").innerHTML = 'The mean must be between 0 and 20';
    }else{

         document.querySelector(".display-error-message").innerHTML = '';

         etud.push({
            code,
            nom,
            prenom,
            age : Number(age),
            moy : Number(moy)
         });

         localStorage.setItem('etud', JSON.stringify(etud));

          document.querySelector(".display-success-message").innerHTML = 'Student entered successfuly';


          setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
          }, 3000);

          codeIn.value = '';
          nomIn.value = '';
          prenomIn.value = '';
          ageIn.value = '';
          moyIn.value = '';

    }
}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addEtud();

});

document.body.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        addEtud();
    }
});