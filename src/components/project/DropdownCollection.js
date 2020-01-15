import React from 'react';
import PropTypes from 'prop-types';
import { generateID } from '../../function';
import useCollections from '../../queries/useCollections';
import Dropdown from '../unit/Dropdown';
import Link from '../unit/Link';

const DropdownCollection = ({ offcanvas, caret, label, name }) => {
    const { edges } = useCollections();
    const loopCollection = edges.map(({ node }) => (
        <Link key={generateID()} className="dropdown-item" to={`/${node.handle}`} children={node.title} />
    ));
    return (
        <Dropdown name={offcanvas ? `offcanvas-${name}` : name} label={label} caret={caret}>
            {loopCollection}
        </Dropdown>
    );
};

DropdownCollection.propTypes = {
    offcanvas: PropTypes.bool,
    caret: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
};

DropdownCollection.defaultProps = {
    offcanvas: false,
    caret: false,
    label: undefined,
    name: undefined,
};

export default DropdownCollection;
