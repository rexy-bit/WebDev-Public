
let calculation = localStorage.getItem('calculation') ;
if(calculation == null){
    calculation = '';
}

function updateCalculation(value){
    calculation += value;


    document.querySelector('.display-calculation').innerHTML = calculation;

    localStorage.setItem('calculation', calculation);

}

function clearCalculation(){
    calculation = 0;
    document.querySelector('.display-calculation').innerHTML = calculation;

    localStorage.setItem('.calculation', calculation);
}