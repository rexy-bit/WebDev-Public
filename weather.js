

const apiKey = "ebea778ef6f7dcda94a7456c36430cf3";


const weatherMsg = document.querySelector(".weather-msg");

let currentData = JSON.parse(localStorage.getItem('currentData')) || null;

 if(currentData !== null){
    displayData(currentData);
 }

function getData(){


let cityIn = document.querySelector(".input-ville");
let city = cityIn.value;




    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {

        if(!response.ok){
           throw new Error("Ville introuvable ou problème réseau.");
        }

        return response.json();
      })
      .then(data=>{
          
         console.log(data);
         currentData = data;
         localStorage.setItem('currentData', JSON.stringify(currentData));

         displayData(data);
      }).catch(error => console.error('Error : ', error));
      
}


function displayData(data){

      if (!data || !data.main || !data.weather) {
    console.error("Données météo invalides :", data);
    return;
  }

    let ville = data.name;
    let temp = data.main.temp;
    let description = data.weather[0].description;

    const container = document.querySelector(".display-weather");
    container.innerHTML = '';

    container.innerHTML = `
       <h2>City : ${ville}</h2>
       <div>Temperature : ${temp}</div>
       <div>Description : ${description}</div>
    `;

}

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener('click', ()=>{
    getData();
});

