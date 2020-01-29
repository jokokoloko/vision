import React from 'react';
import { Link as ScrollTo } from 'react-scroll';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import * as path from '../../path';

const Link = ({ className, activeClassName, to, title, rel, scroll, external, children }) =>
    external ? (
        <a className={className} href={to} title={title} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    ) : scroll ? (
        <ScrollTo className={className} to={to} duration={500} offset={-150} spy smooth>
            {children}
        </ScrollTo>
    ) : (
        <GatsbyLink className={className} activeClassName={activeClassName} to={to} title={title} rel={rel}>
            {children}
        </GatsbyLink>
    );

Link.propTypes = {
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    to: PropTypes.string,
    title: PropTypes.string,
    rel: PropTypes.string,
    scroll: PropTypes.bool,
    external: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Link.defaultProps = {
    className: 'no-class',
    activeClassName: 'active',
    to: path.ROOT,
    title: undefined,
    rel: undefined,
    scroll: false,
    external: false,
};

export default Link;
