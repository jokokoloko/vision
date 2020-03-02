import React from 'react';
import PropTypes from 'prop-types';
import useSite from '../../queries/useSite';
import Link from '../unit/Link';

const Footer = ({ offcanvasPush }) => {
    const { name: title } = useSite();
    return (
        <footer id="footer" className={offcanvasPush} role="contentinfo">
            <section className="navbar navbar-expand-lg">
                <div className="container">
                    <p className="copyright ml-auto">
                        <Link className="navbar-link" title={title} rel="home">
                            {title}
                        </Link>{' '}
                        &copy; {new Date().getFullYear()}
                    </p>
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
