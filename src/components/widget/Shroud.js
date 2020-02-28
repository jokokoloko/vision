import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';

const Shroud = ({ isOpen, children }) => {
    const scrollLock = 'scroll-lock';
    // Move to InterfaceContext
    useEffect(() => {
        document.body.classList.toggle(scrollLock, isOpen);
        return () => document.body.classList.remove(scrollLock);
    }, [isOpen]);
    const springFade = useTransition(isOpen, null, spring.fade);
    return springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} className="shroud d-flex align-items-center justify-content-center">
                    {children}
                </animated.aside>
            ),
    );
};

Shroud.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

Shroud.defaultProps = {
    children: undefined,
};

export default Shroud;
