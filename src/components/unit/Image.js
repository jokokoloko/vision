import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';

const Image = ({ className, source, alternate, fixed }) =>
    fixed ? (
        <GatsbyImage className={className} fixed={source} alt={alternate} />
    ) : (
        <GatsbyImage className={className} fluid={source} alt={alternate} />
    );

Image.propTypes = {
    className: PropTypes.string,
    source: PropTypes.object.isRequired,
    alternate: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
};

Image.defaultProps = {
    className: 'no-class',
    fixed: false,
};

export default Image;
