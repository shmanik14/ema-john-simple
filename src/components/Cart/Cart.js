import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price * element.quantity;
    }
    let shiping = 0;
    if(shiping > 35){
        shiping = 0;
    }
    else if(shiping > 15){
        shiping = 4.99;
    }
    else if(shiping > 0){
        shiping = 12.99;
    }
    const tax = Number((total / 10).toFixed(2));
    return (
        <div>
            <h1>Order Summary</h1>
            <p>Items Order:{cart.length}</p>
            <p>Product Price:{total}</p>
            <p>Shiping Cost: {shiping}</p>
            <p>TAX + VAT: {tax}</p>
            <p>Total Price:{(total + shiping + tax).toFixed(2)}</p>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;