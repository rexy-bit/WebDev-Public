


let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

displayCalculation();

function updateCalculation(value){
   calculation += value;
   displayCalculation();
   saveCalculation();
   
    
}

function displayCalculation(){
    document.querySelector('.display').innerHTML = calculation;
}

function saveCalculation(){
    localStorage.setItem('calculation', JSON.stringify(calculation));
}

function clearCalculation(){
    calculation = '';
    displayCalculation();
    saveCalculation();
}