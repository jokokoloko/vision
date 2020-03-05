import React, { Fragment, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';
import * as spring from '../../spring';

const Lock = () => {
    const classScrollLock = 'scroll-lock';
    useEffect(() => {
        document.body.classList.add(classScrollLock);
        return () => document.body.classList.remove(classScrollLock);
    }, []);
    return null;
};

const Shroud = ({ isOpen, isLock, onClick, children }) => {
    const springFade = useTransition(isOpen, null, spring.fade);
    const animateSpringFade = springFade.map(
        ({ item, key, props }) =>
            item && (
                <animated.aside key={key} style={props} className="shroud d-flex align-items-center justify-content-center" onClick={onClick}>
                    {children}
                </animated.aside>
            ),
    );
    return (
        <Fragment>
            {isLock && <Lock />}
            {animateSpringFade}
        </Fragment>
    );
};

Shroud.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isLock: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

Shroud.defaultProps = {
    onClick: undefined,
    children: undefined,
};

export default Shroud;
