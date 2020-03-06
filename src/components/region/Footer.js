import React, { useContext } from 'react';
import { InterfaceContext } from '../../contexts/interface';
import useSite from '../../queries/useSite';
import Link from '../unit/Link';

const Footer = () => {
    const { classOffCanvasPush } = useContext(InterfaceContext);
    const { name } = useSite();
    const container = 'container';
    return (
        <footer id="footer" className={classOffCanvasPush} role="contentinfo">
            <section className="navbar navbar-expand-lg">
                <div className={container}>
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
};

export default Footer;
