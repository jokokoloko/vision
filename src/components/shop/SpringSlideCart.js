import React, { Fragment, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import * as spring from '../../spring';
import { InterfaceContext } from '../../contexts/interface';
import Cart from './Cart';
import Loader from '../widget/Loader';
import Shroud from '../widget/Shroud';

const SpringSlideCart = () => {
    const { isLoading, isCartOpen, onCartClose } = useContext(InterfaceContext);
    const isOpen = isLoading || isCartOpen;
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
            <Shroud isOpen={isOpen} isLock={isOpen} />
            {animateSpringSlide}
            <Shroud isOpen={isLoading} isLock={false}>
                <Loader />
            </Shroud>
        </Fragment>
    );
};

export default SpringSlideCart;
