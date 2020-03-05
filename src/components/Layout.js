import React, { Fragment, useContext } from 'react';
import OffCanvas from 'react-aria-offcanvas';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import * as style from '../style';
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
    const { classOffCanvasPush, isLoading, isScrollShowing, isOffCanvasOpen, isShroudOpen, onOffCanvasOpen, onOffCanvasClose } = useContext(
        InterfaceContext,
    );
    const { name } = useSite();
    return (
        <Fragment>
            <SEO location={location} template={template} title={title} description={description} article={article} other={other} />
            <OffCanvas
                width="80%"
                height="100%"
                labelledby="menu-button"
                style={style.OFFCANVAS_OBJECT}
                isOpen={isOffCanvasOpen}
                onClose={onOffCanvasClose}
            >
                <nav id="menu-offcanvas" className="offcanvas-menu">
                    <Link className="offcanvas-brand" title={name} rel="home">
                        <Logo alternate={name} />
                    </Link>
                    <Menu offcanvas />
                    <Account offcanvas />
                </nav>
            </OffCanvas>
            <Header name={name} classOffCanvasPush={classOffCanvasPush} isOffCanvasOpen={isOffCanvasOpen} onOffCanvasOpen={onOffCanvasOpen} />
            <main id="main" className={classOffCanvasPush} role="main">
                <div className="container-fluid">{children}</div>
            </main>
            <Footer name={name} classOffCanvasPush={classOffCanvasPush} />
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
