import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handlePlaceOrder = () => {
        history.push('/shipment');    
    }

    const removeProduct = (productKey) =>{
        console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key!== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    } , []);
    const thankYou = <img src={happyImage} alt=""/>
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                orderPlaced && thankYou
            }
            </div>
            <div className="cart-container">
            <Cart cart={cart}>
            <button onClick={() => handlePlaceOrder()} className="cart-btn">Proceed Checkout</button>
            </Cart>
            </div>
            
        </div>
    );
};

export default Review;