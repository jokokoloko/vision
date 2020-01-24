import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const ArticleStep = ({ step }) => (
    <article id={`step-${step.slug}`} className={`step step-${step.order} col-lg-4`}>
        <figure className="node-xs-50">
            <Image className="image" source={step.image.fluid} alternate={step.title} />
        </figure>
        <header className="node-xs-50">
            <p className="excerpt" dangerouslySetInnerHTML={{ __html: step.body.childMarkdownRemark.html }} />
        </header>
    </article>
);

ArticleStep.propTypes = {
    step: PropTypes.object.isRequired,
};

export default ArticleStep;
