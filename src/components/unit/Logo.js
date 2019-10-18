import React from 'react';
import PropTypes from 'prop-types';
import useLogo from '../../queries/useLogo';

const Logo = ({ className, alternate }) => <img className={`logo img-fluid ${className}`} src={useLogo()} alt={alternate} />;

Logo.propTypes = {
    className: PropTypes.string,
    alternate: PropTypes.string,
};

Logo.defaultProps = {
    className: 'no-class',
    alternate: 'logo',
};

export default Logo;
