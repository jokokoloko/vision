import React from 'react';
import PropTypes from 'prop-types';
import Link from '../unit/Link';

const Footer = ({ name, classOffCanvasPush }) => (
    <footer id="footer" className={classOffCanvasPush} role="contentinfo">
        <section className="navbar navbar-expand-lg">
            <div className="container">
                <p className="copyright ml-auto">
                    <Link className="navbar-link" title={name} rel="home">
                        {name}
                    </Link>{' '}
                    &copy; {new Date().getFullYear()}
                </p>
            </div>
        </section>
    </footer>
);

Footer.propTypes = {
    name: PropTypes.string,
    classOffCanvasPush: PropTypes.string,
};

Footer.defaultProps = {
    name: undefined,
    classOffCanvasPush: 'no-offcanvas',
};

export default Footer;
