import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const ArticleStep = ({ step }) => (
    <article id={`step-${step.slug}`} className={`step step-${step.order} col-lg-4`}>
        {step.image && (
            <figure className="node-xs-50">
                <Image className="image" source={step.image.fluid} alternate={step.title} />
            </figure>
        )}
        {step.body && <header className="node-xs-50" dangerouslySetInnerHTML={{ __html: step.body.childMarkdownRemark.html }} />}
    </article>
);

ArticleStep.propTypes = {
    step: PropTypes.object.isRequired,
};

export default ArticleStep;
