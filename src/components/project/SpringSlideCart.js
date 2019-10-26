import React, { useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { ShopContext } from '../../contexts/shop';
import Cart from './Cart';

const SpringSlideCart = () => {
    const { isCartOpen, onCartClose } = useContext(ShopContext);
    const transitions = useTransition(isCartOpen, null, {
        from: { transform: 'translate3d(100%, 0, 0)' },
        enter: { transform: 'translate3d(0, 0, 0)' },
        leave: { transform: 'translate3d(100%, 0, 0)' },
    });
    return transitions.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} id="spring-slide-cart" className="spring-slide-cart spring-slide">
                    <Cart />
                    <button type="button" className="spring-slide-close close" onClick={onCartClose}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button>
                </animated.aside>
            ),
    );
};

export default SpringSlideCart;
