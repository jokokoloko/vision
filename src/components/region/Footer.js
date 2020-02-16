import React from 'react';
import PropTypes from 'prop-types';
import useSite from '../../queries/useSite';
import Link from '../unit/Link';
import Logo from '../unit/Logo';

const Footer = ({ offcanvasPush }) => {
    const { name: title } = useSite();
    return (
        <footer id="footer" className={offcanvasPush} role="contentinfo">
            <section className="navbar navbar-expand-lg d-none d-lg-block">
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
