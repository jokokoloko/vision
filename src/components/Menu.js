import React from 'react';
import PropTypes from 'prop-types';
import { slugify, generateID } from '../function';
import * as menu from '../menu';
import Dropdown from './unit/Dropdown';
import Link from './unit/Link';

const Menu = ({ offcanvas }) => {
    const loopMain = menu.MAIN.map(({ label, to, scroll, external, children }) => {
        const name = slugify(label);
        const loopChildren =
            children &&
            children.map(({ label, to, scroll, external }) => (
                <Link key={generateID()} className="dropdown-item" to={to} scroll={scroll} external={external} children={label} />
            ));
        return children ? (
            <Dropdown key={generateID()} name={offcanvas ? `offcanvas-${name}` : name} label={label} alignment="right" caret>
                {loopChildren}
            </Dropdown>
        ) : (
            <li key={generateID()} className="nav-item">
                <Link className="nav-link" to={to} scroll={scroll} external={external} children={label} />
            </li>
        );
    });
    return <ul className={offcanvas ? 'offcanvas-nav nav flex-column' : 'navbar-nav ml-auto'}>{loopMain}</ul>;
};

Menu.propTypes = {
    offcanvas: PropTypes.bool,
};

Menu.defaultProps = {
    offcanvas: false,
};

export default Menu;
