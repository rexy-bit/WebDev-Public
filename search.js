let etud = JSON.parse(localStorage.getItem('etud'));

    let intervalId;
    let intervalId2;
function searchEmp(){

    let codeIn = document.querySelector(".se-code");
    let code = codeIn.value;

    let trouve = false;
    let sEtud;

    let i = 0;
    while(i<etud.length && (!trouve)){
        if(etud[i].code === code){
            trouve = true;
            sEtud = etud[i];
        }
        i++;
    }

   
    clearInterval(intervalId);

    if(trouve){
        
        document.querySelector(".search-result").innerHTML = 'Student found !';

        intervalId = setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        }, 3000);

        const container = document.querySelector(".display-search");
        container.innerHTML = '';
        
        const searchD = document.createElement("div");
        searchD.className = "etud-div";

        const codeD = document.createElement("div");
        codeD.textContent = `- Code : ${sEtud.code}`;

        const nomD = document.createElement("div");
        nomD.textContent = `- Last-name : ${sEtud.nom}`;

        const prenomD = document.createElement("div");
        prenomD.textContent = `- First-name : ${sEtud.prenom}`;

        const ageD = document.createElement("div");
        ageD.textContent = `- Age : ${sEtud.age}`;

        const moyD = document.createElement("div");
        moyD.textContent = `Moy : ${sEtud.moy}`;


        searchD.appendChild(codeD);
        searchD.appendChild(nomD);
        searchD.appendChild(prenomD);
        searchD.appendChild(ageD);
        searchD.appendChild(moyD);


        container.appendChild(searchD);

        codeIn.value = '';

        setTimeout(()=>{
            container.innerHTML = '';
        }, 5000);

    }else{


                document.querySelector(".search-result").innerHTML = 'Student not found !';

                clearInterval(intervalId2);

        intervalId2 = setTimeout(()=>{
            document.querySelector(".search-result").innerHTML = '';
        }, 3000);

    }
}


document.querySelector(".search-button").addEventListener('click', ()=>{
    searchEmp();
});


document.body.addEventListener('keydown', (e)=>{
   if(e.key === 'Enter'){
    searchEmp();
   }
});