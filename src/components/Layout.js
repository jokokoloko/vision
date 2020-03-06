import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import { InterfaceContext } from '../contexts/interface';
import SEO from './SEO';
import Header from './region/Header';
import Footer from './region/Footer';
import Offcanvas from './region/Offcanvas';
import Scroll from './widget/Scroll';
import SpringSlideCart from './shop/SpringSlideCart';

const Layout = ({ location, template, title, description, article, other, children }) => {
    const { classOffCanvasPush, isScrollShowing } = useContext(InterfaceContext);
    return (
        <Fragment>
            <SEO location={location} template={template} title={title} description={description} article={article} other={other} />
            <Offcanvas />
            <Header />
            <main id="main" className={classOffCanvasPush} role="main">
                <div className="container-fluid">{children}</div>
            </main>
            <Footer />
            {isScrollShowing && <Scroll className="d-none d-lg-block" position="fixed" up top />}
            <SpringSlideCart />
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
