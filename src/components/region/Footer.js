import React from 'react';
import PropTypes from 'prop-types';
import useSite from '../../queries/useSite';
import Basic from '../section/Basic';
import Link from '../unit/Link';

const Footer = ({ offcanvasPush }) => {
    const { name: title } = useSite();
    return (
        <footer id="footer" className={offcanvasPush} role="contentinfo">
            <div className="container-fluid">
                <Basic id="footer-default" space="space-none">
                    <div className="case style-border-top-grey">
                        <p className="copyright">
                            <Link className="navbar-link" title={title} rel="home">
                                {title}
                            </Link>{' '}
                            &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </Basic>
            </div>
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
