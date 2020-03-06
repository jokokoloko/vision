import React, { useContext } from 'react';
import AriaOffcanvas from 'react-aria-offcanvas';
import { InterfaceContext } from '../../contexts/interface';
import useSite from '../../queries/useSite';
import Account from '../Account';
import Menu from '../Menu';
import Link from '../unit/Link';
import Logo from '../unit/Logo';

const Offcanvas = () => {
    const { isOffCanvasOpen, onOffCanvasClose } = useContext(InterfaceContext);
    const { name } = useSite();
    const style = {
        overlay: {
            background: 'rgba(34, 34, 34, 0.8)',
            zIndex: 9999,
        },
        content: {
            background: '#222',
        },
    };
    return (
        <AriaOffcanvas width="80%" height="100%" labelledby="menu-button" style={style} isOpen={isOffCanvasOpen} onClose={onOffCanvasClose}>
            <nav id="menu-offcanvas" className="offcanvas-menu">
                <Link className="offcanvas-brand" title={name} rel="home">
                    <Logo alternate={name} />
                </Link>
                <Menu offcanvas />
                <Account offcanvas />
            </nav>
        </AriaOffcanvas>
    );
};

export default Offcanvas;
