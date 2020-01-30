import React from 'react';
import useAction from '../../queries/useAction';

const MenuAccount = () => {
    const { register, logIn } = useAction();
    return (
        <ul className="offcanvas-nav nav flex-column">
            <li className="nav-item">
                <a className="nav-link" href={register.external}>
                    {register.label}
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={logIn.external}>
                    {logIn.label}
                </a>
            </li>
        </ul>
    );
};

export default MenuAccount;
