import React from 'react';
import PropTypes from 'prop-types';
import { slugify, generateID } from '../function';
import * as menu from '../menu';
import Dropdown from './unit/Dropdown';
import Link from './unit/Link';
import DropdownCollection from './project/DropdownCollection';
import DropdownResource from './project/DropdownResource';

const Menu = ({ offcanvas, caret }) => {
    const loopMain = menu.MAIN.map(({ label, to, scroll, external, children, custom }) => {
        const name = slugify(label);
        const loopChildren =
            children &&
            children.map(({ label, to, scroll, external }) => (
                <Link key={generateID()} className="dropdown-item" to={to} scroll={scroll} external={external} children={label} />
            ));
        return custom === 'collection' ? (
            <DropdownCollection key={generateID()} offcanvas={offcanvas} caret={caret} label={label} name={name} />
        ) : custom === 'resource' ? (
            <DropdownResource key={generateID()} offcanvas={offcanvas} caret={caret} label={label} name={name} />
        ) : children ? (
            <Dropdown key={generateID()} name={offcanvas ? `offcanvas-${name}` : name} label={label} caret={caret}>
                {loopChildren}
            </Dropdown>
        ) : (
            <li key={generateID()} className="nav-item">
                <Link className="nav-link" to={to} scroll={scroll} external={external} children={label} />
            </li>
        );
    });
    return <ul className={offcanvas ? 'offcanvas-nav nav flex-column' : 'navbar-nav'}>{loopMain}</ul>;
};

Menu.propTypes = {
    offcanvas: PropTypes.bool,
    caret: PropTypes.bool,
};

Menu.defaultProps = {
    offcanvas: false,
    caret: false,
};

export default Menu;
