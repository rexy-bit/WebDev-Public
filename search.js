let emp = JSON.parse(localStorage.getItem('emp')) || [];


function searchEmp(){

    let codeIn = document.querySelector(".s-code");
    let code = codeIn.value;

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

        document.querySelector(".display-search-result").innerHTML = 'Employee found !';

        setTimeout(()=>{
            document.querySelector(".display-search-result").innerHTML = '';
        },3000);


        const container = document.querySelector(".display-search");
        container.innerHTML = '';

        const empDiv = document.createElement("div");
        empDiv.className = "emp-div";

        const codeD = document.createElement("div");
        codeD.className = "code";
        codeD.textContent = `- Code : ${emp[i].code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Fname : ${emp[i].nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- Lname : ${emp[i].prenom}`;

        const ageD = document.createElement("div");
        ageD.textContent = `- Age : ${emp[i].age}`;

        const salaireD = document.createElement("div");
        salaireD.textContent = `- Salary : ${emp[i].salaire}`;


        empDiv.appendChild(codeD);
        empDiv.appendChild(nomD);
        empDiv.appendChild(prenomD);
        empDiv.appendChild(ageD);
        empDiv.appendChild(salaireD);

        container.appendChild(empDiv);


        setTimeout(()=>{
            container.innerHTML = '';
        }, 3000);


     }else{

                document.querySelector(".display-search-result").innerHTML = 'Employee not found !';

        setTimeout(()=>{
            document.querySelector(".display-search-result").innerHTML = '';
        },3000);
     }

     codeIn.value = '';

}

document.querySelector(".search-button").addEventListener('click', ()=>{
    searchEmp();
});

document.body.addEventListener('keydown', ()=>{
    searchEmp();
});

