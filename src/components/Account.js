import React from 'react';
import useAction from '../queries/useAction';

const Account = () => {
    const { register, logIn } = useAction();
    return (
        <ul className="navbar-action ml-auto account account-guest">
            <li className="nav-item">
                <a className="btn btn-hollow btn-md btn-pill no-class" href={register.external}>
                    {register.label}
                </a>
            </li>
            <li className="nav-item">
                <a className="btn btn-hollow btn-md btn-pill no-class" href={logIn.external}>
                    {logIn.label}
                </a>
            </li>
        </ul>
    );
};

export default Account;
