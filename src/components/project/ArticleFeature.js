import React from 'react';
import PropTypes from 'prop-types';
import { logicDescription } from '../../logic';
import Image from '../unit/Image';

const ArticleFeature = ({ feature }) => (
    <article id={`feature-${feature.slug}`} className={`feature feature-${feature.order} col-lg-4`}>
        <figure className="node-xs-50 d-flex justify-content-center">
            <Image className="image" source={feature.image.fixed} alternate={feature.title} fixed />
        </figure>
        <header className="node-xs-50 text-center">
            <h4>{feature.title}</h4>
            {feature.excerpt && <p className="excerpt" dangerouslySetInnerHTML={{ __html: logicDescription(feature) }} />}
        </header>
    </article>
);

ArticleFeature.propTypes = {
    feature: PropTypes.object.isRequired,
};

export default ArticleFeature;
