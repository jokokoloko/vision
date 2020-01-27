import React from 'react';
import PropTypes from 'prop-types';
import useFooter from '../../queries/useFooter';
import useSite from '../../queries/useSite';
import Basic from '../section/Basic';
import Link from '../unit/Link';
import Logo from '../unit/Logo';

const Footer = ({ offcanvasPush }) => {
    const { name: title } = useSite();
    const { edges } = useFooter();
    const loopFooter = edges.map(({ node: collection }) => (
        <article
            key={collection.id}
            id={`collection-${collection.slug}`}
            className={`collection collection-${collection.slug} col-lg-${collection.column}`}
        >
            <section dangerouslySetInnerHTML={{ __html: collection.body.childMarkdownRemark.html }} />
        </article>
    ));
    return (
        <footer id="footer" className={offcanvasPush} role="contentinfo">
            <Basic space="space-xs-50 space-lg-80" color={6}>
                <div className="row gutter-50 gutter-lg-80">{loopFooter}</div>
            </Basic>
            <section className="navbar navbar-expand-lg color-6">
                <div className="container justify-content-center">
                    <Link className="navbar-brand" title={title} rel="home">
                        <Logo alternate={title} />
                    </Link>
                </div>
            </section>
        </footer>
    );
};

Footer.propTypes = {
    offcanvasPush: PropTypes.string,
};

Footer.defaultProps = {
    offcanvasPush: 'no-offcanvas',
};

export default Footer;
