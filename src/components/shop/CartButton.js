import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import { InterfaceContext } from '../../contexts/interface';
import { ShopContext } from '../../contexts/shop';

const CartButton = () => {
    const { isCartOpen, setCartOpen } = useContext(InterfaceContext);
    const { quantity } = useContext(ShopContext);
    const onClick = () => setCartOpen(true);
    return (
        <button
            type="button"
            id="cart-button"
            className="navbar-cart"
            aria-label="Cart"
            aria-controls="cart"
            aria-expanded={isCartOpen}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faShoppingCart} />
            {quantity > 0 && <span className="cart-indicator">{quantity}</span>}
        </button>
    );
};

export default CartButton;
