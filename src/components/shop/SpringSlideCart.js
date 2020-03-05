import React, { Fragment, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import * as spring from '../../spring';
import { InterfaceContext } from '../../contexts/interface';
import Cart from './Cart';
import Shroud from '../widget/Shroud';

const SpringSlideCart = () => {
    const { isLoading, isCartOpen, onCartClose } = useContext(InterfaceContext);
    const springSlide = useTransition(isCartOpen, null, spring.slide);
    const animateSpringSlide = springSlide.map(
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
                    <Cart onClick={onCartClose} />
                </animated.aside>
            ),
    );
    return (
        <Fragment>
            <Shroud isOpen={isLoading || isCartOpen} />
            {animateSpringSlide}
        </Fragment>
    );
};

export default SpringSlideCart;
