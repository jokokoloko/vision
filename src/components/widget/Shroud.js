import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';

const Shroud = ({ isOpen, onClick, children }) => {
    const classScrollLock = 'scroll-lock';
    const springFade = useTransition(isOpen, null, spring.fade);
    useEffect(() => {
        document.body.classList.add(classScrollLock);
        return () => document.body.classList.remove(classScrollLock);
    }, []);
    return springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} className="shroud d-flex align-items-center justify-content-center" onClick={onClick}>
                    {children}
                </animated.aside>
            ),
    );
};

Shroud.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

Shroud.defaultProps = {
    onClick: undefined,
    children: undefined,
};

export default Shroud;
