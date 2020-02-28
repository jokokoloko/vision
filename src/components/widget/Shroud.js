import React, { useEffect, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';
import { InterfaceContext } from '../../contexts/interface';

const Shroud = ({ children }) => {
    const scrollLock = 'scroll-lock';
    const { isShroudOpen } = useContext(InterfaceContext);
    // Move to InterfaceContext
    useEffect(() => {
        document.body.classList.toggle(scrollLock, isShroudOpen);
        return () => document.body.classList.remove(scrollLock);
    }, [isShroudOpen]);
    const springFade = useTransition(isShroudOpen, null, spring.fade);
    return springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} className="shroud d-flex align-items-center justify-content-center" tabIndex="-1">
                    {children}
                </animated.aside>
            ),
    );
};

Shroud.propTypes = {
    children: PropTypes.node,
};

Shroud.defaultProps = {
    children: undefined,
};

export default Shroud;
