import React from 'react';
import { generateID } from '../../function';
import * as path from '../../path';
import useCollections from '../../queries/useCollections';
import Link from '../unit/Link';

const MenuCollection = () => {
    const { edges } = useCollections();
    const loopCollection = edges.map(({ node }) => (
        <li key={generateID()} id={`collection-${node.handle}`} className={`collection collection-${node.handle} menu-item`}>
            <Link className="menu-link" title={node.title} to={`${path.COLLECTION}/${node.handle}`}>
                {node.title}
            </Link>
        </li>
    ));
    return (
        <aside className="panel">
            <h4>Collections</h4>
            <ul className="menu-list">{loopCollection}</ul>
        </aside>
    );
};

export default MenuCollection;
