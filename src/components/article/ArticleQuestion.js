import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const ArticleQuestion = ({ question }) => (
    <article id={`question-${question.slug}`} className={`question question-${question.order}`}>
        <div className="row gutter-50">
            <div className="col-4">
                <header>
                    <h4 className="question-title">{question.title}</h4>
                </header>
            </div>
            <div className="col">
                <section dangerouslySetInnerHTML={{ __html: question.body.childMarkdownRemark.html }} />
            </div>
        </div>
    </article>
);

ArticleQuestion.propTypes = {
    question: PropTypes.object.isRequired,
};

export default ArticleQuestion;
