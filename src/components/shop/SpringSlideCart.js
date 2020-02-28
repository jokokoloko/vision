import React, { useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import * as spring from '../../spring';
import { InterfaceContext } from '../../contexts/interface';
import Cart from './Cart';

const SpringSlideCart = () => {
    const { isCartOpen, setCartOpen } = useContext(InterfaceContext);
    const springSlide = useTransition(isCartOpen, null, spring.slide);
    const onClick = () => setCartOpen(false);
    return springSlide.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside
                    key={key}
                    style={props}
                    id="spring-slide-cart"
                    className="spring-slide-cart spring-slide"
                    aria-labelledby="cart-button"
                    aria-hidden={!isCartOpen}
                    tabIndex="-1"
                >
                    <Cart onClick={onClick} />
                </animated.aside>
            ),
    );
};

export default SpringSlideCart;
