import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';

const Shroud = ({ isOpen, onClose }) => {
    const scrollLock = 'scroll-lock';
    useEffect(() => {
        document.body.classList.toggle(scrollLock, isOpen);
        return () => document.body.classList.remove(scrollLock);
    }, [isOpen]);
    const springFade = useTransition(isOpen, null, spring.fade);
    const animateSpringFade = springFade.map(
        ({ item, key, props }) => item && <animated.aside key={key} style={props} id="shroud" className="shroud" onClick={onClose} />,
    );
    return animateSpringFade;
};

Shroud.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

Shroud.defaultProps = {
    onClose: undefined,
};

export default Shroud;
