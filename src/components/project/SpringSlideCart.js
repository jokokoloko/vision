import React, { Fragment, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import * as spring from '../../spring';
import { ShopContext } from '../../contexts/shop';
import Cart from './Cart';
import Shroud from '../widget/Shroud';

const SpringSlideCart = () => {
    const { isCartOpen, onCartClose } = useContext(ShopContext);
    const springSlide = useTransition(isCartOpen, null, spring.slide);
    const animateSpringSlide = springSlide.map(
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
    return (
        <Fragment>
            <Shroud isOpen={isCartOpen} onClose={onCartClose} />
            {animateSpringSlide}
        </Fragment>
    );
};

export default SpringSlideCart;
