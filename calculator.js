let calculation = JSON.parse(localStorage.getItem('calculation')) ||  "";

displayCalculation();

function updateCalculation(value){

     calculation += value;
     document.querySelector(".display").innerHTML = calculation;

     localStorage.setItem("calculation", JSON.stringify(calculation));

}

function clearCalculation(){

    calculation = 0;
    localStorage.setItem("calculation", JSON.stringify(calculation));
    document.querySelector(".display").innerHTML = "cleared";

}

function displayCalculation(){
    document.querySelector(".display").innerHTML = calculation;
}