
function calculateTotal(){
     const costInput = document.querySelector('.input-cost');

     let cost = Number(costInput.value)*100;


     if(cost <= 0){
        document.querySelector('.display-error-message').innerHTML = 'Please enter right cost';
     }

     if(cost <= 4000){
           cost = cost + 1000;
     }else if(cost > 4000){
        cost = cost;
     }

     document.querySelector('.display-total-cost').innerHTML = `Total cost is : $${cost/100}`;


}


function pressOkay(){
    console.log(event.key);
    if(event.key === 'Enter'){

        calculateTotal();
    }
}


function subscribe(){

    const buttonElement = document.querySelector('.js-button');

    if(buttonElement.innerText === 'Subscribe'){
        buttonElement.innerHTML  = 'Subscribed';
        
        buttonElement.classList.add('is-subscribed');
    }else if(buttonElement.innerText === 'Subscribed'){
        buttonElement.innerHTML = 'Subscribe';

        buttonElement.classList.remove('is-subscribed');
    }
}