import React, { useContext } from 'react';
import { ShopContext } from '../contexts/shop';
import useAction from '../queries/useAction';

const Account = () => {
    const { quantity, toggleCartOpen } = useContext(ShopContext);
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
            <li className="nav-item">
                <button type="button" className="nav-link nav-btn btn-cart btn" onClick={toggleCartOpen}>
                    Cart{quantity > 0 && <span className="cart-indicator">{quantity}</span>}
                </button>
            </li>
        </ul>
    );
};

export default Account;
