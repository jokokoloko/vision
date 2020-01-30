import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import { ShopContext } from '../../contexts/shop';

const CartButton = () => {
    const { quantity, toggleCartOpen } = useContext(ShopContext);
    return (
        <button type="button" className="navbar-cart" onClick={toggleCartOpen}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {quantity > 0 && <span className="cart-indicator">{quantity}</span>}
        </button>
    );
};

export default CartButton;
