import React, { useEffect, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import * as spring from '../../spring';
import { InterfaceContext } from '../../contexts/interface';
import Loader from './Loader';

const Shroud = () => {
    const scrollLock = 'scroll-lock';
    const { isLoading, isShroudOpen } = useContext(InterfaceContext);
    // Move to InterfaceContext
    useEffect(() => {
        document.body.classList.toggle(scrollLock, isShroudOpen);
        return () => document.body.classList.remove(scrollLock);
    }, [isShroudOpen]);
    const springFade = useTransition(isShroudOpen, null, spring.fade);
    return springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside
                    key={key}
                    style={props}
                    id="shroud"
                    className={`shroud d-flex align-items-center justify-content-center ${isLoading ? 'show-loader' : 'no-class'}`}
                    tabIndex="-1"
                >
                    {isLoading && <Loader />}
                </animated.aside>
            ),
    );
};

export default Shroud;
