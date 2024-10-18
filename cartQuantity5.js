let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));

function addToCart(value){

    if(cartQuantity + value <= 10){
        cartQuantity += value;
    }else if(cartQuantity +  value > 10){
        document.querySelector('.display-error-message').innerHTML = `Error your cart is full`;

        return false;
    }


    document.querySelector('.display-cart-quantity').innerHTML = `Cart quantity is : ${cartQuantity}`; 

    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

}

function removeFromCart(value){
    if(cartQuantity + value >= 0){
        cartQuantity += value;
    }else if(cartQuantity + value <= 0){
        document.querySelector('.display-error-message').innerHTML = `Your cart is empty please add items before checking quantity`;

        return false;
    }

    document.querySelector('.display-cart-quantity').innerHTML = `Cart quantity is : ${cartQuantity}`;

    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
}