let cartQuantity = 0;

function addToCart(value){

    

    if(cartQuantity + value  <= 10){
        cartQuantity += value;
    }else if(cartQuantity + value > 10){
        document.querySelector('.display-error-message').innerHTML = `Sorry your cart is full`;
    }

    document.querySelector('.display-cart').innerHTML = `Cart quantity is : ${cartQuantity}`;

}

function removeFromCart(value){

     
    if(cartQuantity + value >= 0 && cartQuantity <= 10){
        cartQuantity += value;
        
    }else if(cartQuantity + value < 0){
        document.querySelector('.display-error-message').innerHTML = `Sorry your cart is empty update your items`;
    }
    

    document.querySelector('.display-cart').innerHTML = `Cart quantity is : ${cartQuantity}`;
    

}