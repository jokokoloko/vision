import React from 'react';
import PropTypes from 'prop-types';
import { logicDescription } from '../../logic';
import Image from '../unit/Image';

const ArticleStep = ({ step }) => (
    <article id={`step-${step.slug}`} className={`step step-${step.order} col-lg-3`}>
        <figure className="node-xs-50 d-flex justify-content-center">
            <Image className="image" source={step.image.fixed} alternate={step.title} fixed />
        </figure>
        <header className="node-xs-50 text-center">
            <p className="excerpt" dangerouslySetInnerHTML={{ __html: logicDescription(step) }} />
        </header>
    </article>
);

ArticleStep.propTypes = {
    step: PropTypes.object.isRequired,
};

export default ArticleStep;
