let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

function addToCart(value){

    if(cartQuantity + value <= 10 ){
       cartQuantity+= value;
       document.querySelector('.display-cart').innerHTML = `Cart quantity is ${cartQuantity}`;
       localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    }else{
        document.querySelecttor.innerHTML = `error : can not add more than 10 items`;
    }

}

function removeFromCart(value){

    if(cartQuantity - value < 0){
        document.querySelector('.display-error-message').innerHTML = `error : you can not remove from an empty cart`;
    }else{
        cartQuantity -= value;
        document.querySelector('.display-cart').innerHTML = `Cart quantity is ${cartQuantity}`;
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

    }
    
    
    }

    function displayCart(){
        document.querySelector('.display-cart').innerHTML = `Cart quantity is ${cartQuantity}`;
    }