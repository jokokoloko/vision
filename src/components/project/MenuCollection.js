import React from 'react';
import { generateID } from '../../function';
import useCollection from '../../queries/useCollection';
import Link from '../unit/Link';

const MenuCollection = () => {
    const { edges } = useCollection();
    const loopCollection = edges.map(({ node }) => (
        <li key={generateID()} id={`collection-${node.handle}`} className={`collection collection-${node.handle} menu-item`}>
            <Link className="menu-link" title={node.title} to={`/${node.handle}`}>
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
