import React from 'react';
import PropTypes from 'prop-types';

const Account = ({ offcanvas }) => (
    <ul className={offcanvas ? 'offcanvas-nav nav flex-column' : 'navbar-action ml-auto account account-guest'}>
        <li className="nav-item">
            <a className={offcanvas ? 'nav-link' : 'btn btn-hollow btn-md btn-pill no-class'} href="/">
                Register
            </a>
        </li>
        <li className="nav-item">
            <a className={offcanvas ? 'nav-link' : 'btn btn-hollow btn-md btn-pill no-class'} href="/">
                Log In
            </a>
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
