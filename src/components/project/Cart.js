import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const Cart = () => {
    const { checkout } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => (
        <li key={item.id} className="cart-line-item">
            <div className="row align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={item.variant.image.src} alt={item.title} />
                </div>
                <div className="col">
                    <h4>{item.title}</h4>
                </div>
                <div className="col-2">
                    <p className="price">${item.variant.price}</p>
                </div>
                <div className="col-2">
                    <p className="quantity">x{item.quantity}</p>
                </div>
            </div>
        </li>
    ));
    return (
        <div id="cart" className="cart">
            <h3 className="cart-title">Cart</h3>
            <ul className="cart-list list-reset">{loopLineItems}</ul>
        </div>
    );
};

export default Cart;
