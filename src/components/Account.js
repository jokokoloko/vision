import React from 'react';
import PropTypes from 'prop-types';
import Link from './unit/Link';

const Account = ({ offcanvas }) => (
    <ul className={offcanvas ? 'offcanvas-nav nav flex-column' : 'navbar-action ml-auto account account-guest'}>
        <li className="nav-item">
            <Link className={offcanvas ? 'nav-link' : 'btn btn-hollow btn-md btn-pill no-class'}>Register</Link>
        </li>
        <li className="nav-item">
            <Link className={offcanvas ? 'nav-link' : 'btn btn-hollow btn-md btn-pill no-class'}>Log In</Link>
        </li>
    </ul>
);

Account.propTypes = {
    offcanvas: PropTypes.bool,
};

Account.defaultProps = {
    offcanvas: false,
};

export default Account;
