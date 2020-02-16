import React from 'react';
import PropTypes from 'prop-types';
import * as path from '../../path';
import Link from '../unit/Link';

const ArticleCollection = ({ collection }) => (
    <article key={collection.id} id={`collection-${collection.handle}`} className={`collection collection-${collection.handle} col-xl-3`}>
        <div className="case d-flex flex-column">
            <header>
                <h4 className="title">
                    <Link
                        className="stretched-link"
                        to={path.COLLECTION === '/' ? `/${collection.handle}` : `${path.COLLECTION}/${collection.handle}`}
                        children={collection.title}
                    />
                </h4>
                <p className="description" dangerouslySetInnerHTML={{ __html: collection.description }} />
            </header>
            <footer className="mt-auto text-right">
                <p className="action">View &rarr;</p>
            </footer>
        </div>
    </article>
);

ArticleCollection.propTypes = {
    collection: PropTypes.object.isRequired,
};

export default ArticleCollection;
