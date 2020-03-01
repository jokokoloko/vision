import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InterfaceContext } from '../../contexts/interface';
import Shroud from '../widget/Shroud';

const Dropdown = ({ name, label, alignment, caret, children }) => {
    const { setDropdownOpen } = useContext(InterfaceContext);
    const [toggle, setToggle] = useState(false);
    const onOpen = useCallback(() => {
        setToggle(true);
        setDropdownOpen(true);
    }, [setDropdownOpen]);
    const onClose = useCallback(() => {
        setToggle(false);
        setDropdownOpen(false);
    }, [setDropdownOpen]);
    console.log(toggle);
    return (
        <li className={`nav-item dropdown ${toggle ? `show` : `hide`}`}>
            <button
                type="button"
                id={`${name}-dropdown`}
                className={`nav-btn btn dropdown-toggle ${caret ? 'caret' : 'no-caret'}`}
                aria-haspopup="true"
                aria-expanded={toggle}
                onClick={onOpen}
            >
                {label}
            </button>
            <Shroud isOpen={toggle} onClick={onClose} />
            {toggle && (
                <div className={`dropdown-menu dropdown-menu-${alignment} show`} aria-labelledby={`${name}-dropdown`}>
                    {children}
                </div>
            )}
        </li>
    );
};

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    alignment: PropTypes.string,
    caret: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
    label: 'Dropdown',
    alignment: 'left',
    caret: false,
};

export default Dropdown;
