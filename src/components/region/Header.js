import React, { useContext } from 'react';
import { InterfaceContext } from '../../contexts/interface';
import useSite from '../../queries/useSite';
import Account from '../Account';
import Menu from '../Menu';
import Link from '../unit/Link';
import Logo from '../unit/Logo';
import CartButton from '../shop/CartButton';

const Header = () => {
    const { classOffCanvasPush, isOffCanvasOpen, onOffCanvasOpen } = useContext(InterfaceContext);
    const { name } = useSite();
    const container = 'container';
    const type = 'fixed';
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

export default Header;
