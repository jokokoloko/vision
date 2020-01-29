import React from 'react';
import PropTypes from 'prop-types';
import { logicDescription } from '../../logic';

const ArticleTest = ({ test }) => (
    <article id={`test-${test.slug}`} className={`test test-${test.order} col-lg-4`}>
        <header className="panel node-xs-50">
            <h4>{test.title}</h4>
            <p className="excerpt" dangerouslySetInnerHTML={{ __html: logicDescription(test) }} />
        </header>
    </article>
);

ArticleTest.propTypes = {
    test: PropTypes.object.isRequired,
};

export default ArticleTest;
