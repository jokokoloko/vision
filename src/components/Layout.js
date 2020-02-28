import React, { Fragment, useState, useEffect } from 'react';
import OffCanvas from 'react-aria-offcanvas';
import { Events } from 'react-scroll';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/function.scss';
import '../styles/theme.scss';
import '../styles/project.scss';
import SEO from './SEO';
import Menu from './Menu';
import Header from './region/Header';
import Footer from './region/Footer';
import Scroll from './widget/Scroll';
import Shroud from './widget/Shroud';
import Link from './unit/Link';
import Logo from './unit/Logo';
import SpringSlideCart from './shop/SpringSlideCart';
import MenuAccount from './project/MenuAccount';

const Layout = ({ location, template, title, description, article, other, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    // Move to InterfaceContext
    useEffect(() => {
        isOpen && Events.scrollEvent.register('end', onClose);
        return () => Events.scrollEvent.remove('end');
    }, [isOpen]);
    const offcanvasPush = isOpen ? 'offcanvas-push offcanvas-push-out' : 'offcanvas-push';
    const offset = 210;
    const [showScroll, setShowScroll] = useState(false);
    // Move to InterfaceContext
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            showScroll && scrollTop <= offset && setShowScroll(false);
            !showScroll && scrollTop >= offset && setShowScroll(true);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [showScroll]);
    const style = {
        overlay: {
            background: 'rgba(34, 34, 34, 0.5)',
            zIndex: 9999,
        },
        content: {
            background: '#222',
        },
    };
    return (
        <Fragment>
            <SEO location={location} template={template} title={title} description={description} article={article} other={other} />
            <OffCanvas width="80%" height="100%" labelledby="menu-button" style={style} isOpen={isOpen} onClose={onClose}>
                <nav id="menu-offcanvas" className="offcanvas-menu">
                    <Link className="offcanvas-brand" title={title} rel="home">
                        <Logo alternate={title} />
                    </Link>
                    <Menu offcanvas />
                    <MenuAccount />
                </nav>
            </OffCanvas>
            <Header offcanvasPush={offcanvasPush} isOpen={isOpen} onOpen={onOpen} />
            <main id="main" className={offcanvasPush} role="main">
                <div className="container-fluid">{children}</div>
            </main>
            <Footer offcanvasPush={offcanvasPush} />
            {showScroll && <Scroll className="d-none d-lg-block" position="fixed" up top />}
            <SpringSlideCart />
            <Shroud />
        </Fragment>
    );
};

Layout.propTypes = {
    location: PropTypes.object,
    template: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    article: PropTypes.bool,
    other: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
    location: undefined,
    template: undefined,
    title: undefined,
    description: undefined,
    article: undefined,
    other: undefined,
};

export default Layout;
