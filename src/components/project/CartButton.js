import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const CartButton = () => {
    const { quantity, toggleCartOpen } = useContext(ShopContext);
    return (
        <button type="button" className="navbar-cart" onClick={toggleCartOpen}>
            Cart{quantity > 0 && <span className="cart-indicator">{quantity}</span>}
        </button>
    );
};

export default CartButton;
