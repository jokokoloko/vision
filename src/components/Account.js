import React, { useContext } from 'react';
import { generateID } from '../function';
import * as menu from '../menu';
import { ShopContext } from '../contexts/shop';
import useSite from '../queries/useSite';
import Button from './unit/Button';
import Dropdown from './unit/Dropdown';
import Link from './unit/Link';

const Account = () => {
    const { checkout, toggleCartOpen } = useContext(ShopContext);
    const { action, link } = useSite();
    const loopChildren = menu.ACCOUNT_LOG_IN.map(({ label, to, scroll, external }) => (
        <Link key={generateID()} className="dropdown-item" to={to} scroll={scroll} external={external} children={label} />
    ));
    const quantity = checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
    return (
        <ul className="navbar-action ml-auto account account-guest">
            <li className="nav-item">
                <Button label={action} to={`/${link.slug}`} />
            </li>
            <Dropdown name="log-in" label="Log in" alignment="right" caret>
                {loopChildren}
            </Dropdown>
            <li className="nav-item">
                <button type="button" className="nav-link nav-btn btn-cart btn" onClick={toggleCartOpen}>
                    Cart{quantity > 0 && <span className="cart-indicator">{quantity}</span>}
                </button>
            </li>
        </ul>
    );
};

export default Account;
