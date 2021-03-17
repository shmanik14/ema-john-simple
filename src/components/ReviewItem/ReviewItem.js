import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, price, key} = props.product;
    const reviewStyle={

    }
    return (
        <div style={reviewStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <h4>Quantity: {quantity}</h4>
            <h4>Price: {price}</h4>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="cart-btn">Remove Product</button>
        </div>
    );
};

export default ReviewItem;