function addEmp(){


    let codeIn = document.querySelector(".input-code");
    let nameIn = document.querySelector(".input-nom");
    let prenomIn = document.querySelector(".input-prenom");
    let ageIn = document.querySelector(".input-age");
    let salaireIn = document.querySelector(".input-salaire");
    
    let code = codeIn.value;
    let nom = nameIn.value;
    let prenom = prenomIn.value;
    let age = ageIn.value;
    let salaire = salaireIn.value;


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
        document.querySelector(".display-error-message").innerHTML = 'The code you entered already exists please try another one';
    }else if(code === '' || nom === ''|| prenom === ''|| age === ''|| salaire ===''){
        document.querySelector(".display-error-message").innerHTML = 'Please enter all the necessary information';
    }else if(isNaN(age) || isNaN(salaire)){
        document.querySelector(".display-error-message").innerHTML = 'Please the age and salary must contain only and only numbers';
    }else if(Number(age) < 0 || Number(salaire)< 0){
        document.querySelector(".display-error-message").innerHTML = 'Please the age and salary must be positive';
    }else{

        document.querySelector(".display-error-message").innerHTML = '';

        emp.push({
            code,
            nom,
            prenom,
            age,
            salaire
        });

         localStorage.setItem('emp', JSON.stringify(emp));

        document.querySelector(".display-success-message").innerHTML = 'Employee added succesfully';

        setTimeout(()=>{
            document.querySelector(".display-success-message").innerHTML = '';
        }, 3000);


     codeIn.value = '';
      nameIn.value = '';
     prenomIn.value = '';
      ageIn.value ='';
     salaireIn.value='';
        

    }

}


document.querySelector(".add-button").addEventListener('click', ()=>{
    addEmp();
});