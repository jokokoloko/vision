import React from 'react';
import PropTypes from 'prop-types';
import { generateID } from '../../function';
import * as path from '../../path';
import useResource from '../../queries/useResource';
import Dropdown from '../unit/Dropdown';
import Link from '../unit/Link';

const DropdownResource = ({ offcanvas, caret, label, name }) => {
    const { edges } = useResource();
    const loopResource = edges.map(({ node: resource }) => (
        <Link
            key={generateID()}
            className="dropdown-item"
            to={path.RESOURCE === '/' ? `/${resource.slug}` : `${path.RESOURCE}/${resource.slug}`}
            children={resource.title}
        />
    ));
    return (
        <Dropdown name={offcanvas ? `offcanvas-${name}` : name} label={label} caret={caret}>
            {loopResource}
        </Dropdown>
    );
};

DropdownResource.propTypes = {
    offcanvas: PropTypes.bool,
    caret: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
};

DropdownResource.defaultProps = {
    offcanvas: false,
    caret: false,
    label: undefined,
    name: undefined,
};

export default DropdownResource;
