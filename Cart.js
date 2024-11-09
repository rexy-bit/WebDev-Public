let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));

if(cartQuantity === null){
    cartQuantity = 0;
}

function addToCart(value){

    if(cartQuantity + value <= 10){
        cartQuantity += value;
    }else if(cartQuantity + value >= 10){
        document.querySelector('.display-error-message').innerHTML = `You cart is full `;
    }

    document.querySelector('.display-cart').innerHTML = `Cart quantity is : ${cartQuantity}`;

    save();
    
}

function removeFromCart(value){

    if(cartQuantity + value >= 0){
        cartQuantity += value;
    }else if(cartQuantity + value < 0){
        document.querySelector('.display-error-message').innerHTML = `Sorry your cart is not enough items to splice`;
    }

    document.querySelector('.display-cart').innerHTML = `Cart quantity is : ${cartQuantity}`;


    save();
}


function save(){
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
}