
let calculation =  localStorage.getItem('calculation')  || '';


document.querySelector(".display-calculation").innerHTML = calculation;
function updateCalculation(num){
     calculation += num;
     document.querySelector(".display-calculation").innerHTML = calculation;
     localStorage.setItem('calculation', calculation);
}

function evalCalculation(){
    calculation = eval(calculation);
    document.querySelector(".display-calculation").innerHTML = calculation;
    localStorage.setItem('calculation', calculation);
}

function clearCalculation(){

    calculation = 0;
    document.querySelector(".display-calculation").innerHTML  = calculation;
    localStorage.setItem('calculation', calculation);

}