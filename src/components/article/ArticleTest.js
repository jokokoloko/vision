import React from 'react';
import PropTypes from 'prop-types';

const ArticleTest = ({ test }) => (
    <article id={`test-${test.slug}`} className={`test test-${test.order} col-lg-4`}>
        <header className="panel node-xs-50">
            {test.title && <h4>{test.title}</h4>}
            {test.body && <p className="excerpt">{test.body.childMarkdownRemark.rawMarkdownBody}</p>}
        </header>
    </article>
);

ArticleTest.propTypes = {
    test: PropTypes.object.isRequired,
};

export default ArticleTest;
