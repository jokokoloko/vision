import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const Cart = () => {
    const { isCartOpen, checkout } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => (
        <li key={item.id} className="line-item">
            <h4>{item.title}</h4>
            <p className="price">${item.variant.price}</p>
            <p className="quantity">x{item.quantity}</p>
        </li>
    ));
    return (
        <aside id="cart" className="cart">
            <h3>Cart</h3>
            <ul>{loopLineItems}</ul>
        </aside>
    );
};

export default Cart;
