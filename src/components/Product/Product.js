import React from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const {img, name, seller, price, stock, key} = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
            <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link> </h4>
            <p>By: {seller}</p>
            <p>Price: $ {price}</p>
            <p>Only {stock} left in stock -- order soon</p>
            { props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="cart-btn"><FontAwesomeIcon icon={faShoppingBasket} /> Add to Card</button>}
            </div>
        </div>
    );
};

export default Product;