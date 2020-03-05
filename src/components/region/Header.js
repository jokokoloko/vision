import React from 'react';
import PropTypes from 'prop-types';
import Account from '../Account';
import Menu from '../Menu';
import Link from '../unit/Link';
import Logo from '../unit/Logo';
import CartButton from '../shop/CartButton';

const Header = ({ name, classOffCanvasPush, isOffCanvasOpen, onOffCanvasOpen }) => {
    const type = 'fixed';
    const container = 'container';
    return (
        <header id="header" className={`navbar navbar-expand-lg navbar-${type}-top ${type}-top ${classOffCanvasPush}`} role="banner">
            <div className={container}>
                <button
                    type="button"
                    id="menu-button"
                    className="navbar-menu navbar-toggler"
                    aria-label="Menu"
                    aria-controls="menu-offcanvas"
                    aria-expanded={isOffCanvasOpen}
                    onClick={onOffCanvasOpen}
                >
                    <span className="icon-text sr-only">Menu</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                </button>
                <Link className="navbar-brand" title={name} rel="home">
                    <Logo alternate={name} />
                </Link>
                <nav id="menu" className="navbar-collapse collapse">
                    <Menu />
                    <Account />
                </nav>
                <CartButton />
            </div>
        </header>
    );
};

Header.propTypes = {
    name: PropTypes.string,
    classOffCanvasPush: PropTypes.string,
    isOffCanvasOpen: PropTypes.bool.isRequired,
    onOffCanvasOpen: PropTypes.func.isRequired,
};

Header.defaultProps = {
    name: undefined,
    classOffCanvasPush: 'no-offcanvas',
};

export default Header;
