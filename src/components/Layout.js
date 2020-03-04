import React, { Fragment, useContext } from 'react';
import OffCanvas from 'react-aria-offcanvas';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import { InterfaceContext } from '../contexts/interface';
import useSite from '../queries/useSite';
import SEO from './SEO';
import Account from './Account';
import Menu from './Menu';
import Header from './region/Header';
import Footer from './region/Footer';
import Loader from './widget/Loader';
import Scroll from './widget/Scroll';
import Shroud from './widget/Shroud';
import Link from './unit/Link';
import Logo from './unit/Logo';
import SpringSlideCart from './shop/SpringSlideCart';

const Layout = ({ location, template, title, description, article, other, children }) => {
    const { isLoading, isScrollShowing, isOffCanvasOpen, isShroudOpen, onOffCanvasOpen, onOffCanvasClose } = useContext(InterfaceContext);
    const { name } = useSite();
    // TODO: Move to InterfaceContext
    const offcanvasPush = isOffCanvasOpen ? 'offcanvas-push offcanvas-push-out' : 'offcanvas-push';
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
            <OffCanvas width="80%" height="100%" labelledby="menu-button" style={style} isOpen={isOffCanvasOpen} onClose={onOffCanvasClose}>
                <nav id="menu-offcanvas" className="offcanvas-menu">
                    <Link className="offcanvas-brand" title={name} rel="home">
                        <Logo alternate={name} />
                    </Link>
                    <Menu offcanvas />
                    <Account offcanvas />
                </nav>
            </OffCanvas>
            <Header name={name} offcanvasPush={offcanvasPush} isOffCanvasOpen={isOffCanvasOpen} onOffCanvasOpen={onOffCanvasOpen} />
            <main id="main" className={offcanvasPush} role="main">
                <div className="container-fluid">{children}</div>
            </main>
            <Footer name={name} offcanvasPush={offcanvasPush} />
            {isScrollShowing && <Scroll className="d-none d-lg-block" position="fixed" up top />}
            <Shroud isOpen={isShroudOpen} />
            <SpringSlideCart />
            <Shroud isOpen={isLoading}>
                <Loader />
            </Shroud>
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
