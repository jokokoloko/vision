import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import * as path from '../../path';

const Button = ({ label, kind, size, display, className, to, disabled }) => (
    <GatsbyLink className={`btn btn-${kind} btn-${size} btn-${display} ${className}`} to={to} disabled={disabled}>
        {label}
    </GatsbyLink>
);

Button.propTypes = {
    label: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    display: PropTypes.string,
    className: PropTypes.string,
    to: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    label: 'Submit',
    kind: 'default',
    size: 'md',
    display: 'initial',
    className: 'no-class',
    to: path.ROOT,
    disabled: false,
};

export default Button;
