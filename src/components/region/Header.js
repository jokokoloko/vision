import React from 'react';
import PropTypes from 'prop-types';
import useSite from '../../queries/useSite';
import Account from '../Account';
import Menu from '../Menu';
import Link from '../unit/Link';
import Logo from '../unit/Logo';

const Header = ({ offcanvasPush, isOpen, onOpen }) => {
    const { name: title } = useSite();
    const type = 'fixed';
    const container = 'container';
    return (
        <header id="header" className={`navbar navbar-expand-lg navbar-${type}-top ${type}-top ${offcanvasPush}`} role="banner">
            <div className={container}>
                <Link className="navbar-brand" title={title} rel="home">
                    <Logo alternate={title} />
                </Link>
                <button
                    type="button"
                    id="menu-button"
                    className="navbar-menu navbar-toggler"
                    aria-label="Menu"
                    aria-controls="menu-offcanvas"
                    aria-expanded={isOpen}
                    onClick={onOpen}
                >
                    <span className="icon-text sr-only">Menu</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                </button>
                <nav id="menu" className="navbar-collapse collapse">
                    <Menu />
                    <Account />
                </nav>
            </div>
        </header>
    );
};

Header.propTypes = {
    offcanvasPush: PropTypes.string,
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func.isRequired,
};

Header.defaultProps = {
    offcanvasPush: 'no-offcanvas',
    isOpen: false,
};

export default Header;
