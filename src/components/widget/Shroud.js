import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';

const Shroud = ({ isOpen, onClose, children }) => {
    const scrollLock = 'scroll-lock';
    useEffect(() => {
        document.body.classList.toggle(scrollLock, isOpen);
        return () => document.body.classList.remove(scrollLock);
    }, [isOpen]);
    const springFade = useTransition(isOpen, null, spring.fade);
    const animateSpringFade = springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} className="shroud d-flex align-items-center justify-content-center" onClick={onClose}>
                    {children}
                </animated.aside>
            ),
    );
    return animateSpringFade;
};

Shroud.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node,
};

Shroud.defaultProps = {
    onClose: undefined,
    children: undefined,
};

export default Shroud;
