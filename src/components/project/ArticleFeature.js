import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const ArticleFeature = ({ feature }) => (
    <article key={feature.id} id={`feature-${feature.slug}`} className={`feature feature-${feature.order}`}>
        <div className="row">
            {feature.image && (
                <div className="col-2">
                    <figure>
                        <Image className="image" source={feature.image.fluid} alternate={feature.title} />
                    </figure>
                </div>
            )}
            {feature.body && (
                <div className="col">
                    <header dangerouslySetInnerHTML={{ __html: feature.body.childMarkdownRemark.html }} />
                </div>
            )}
        </div>
    </article>
);

ArticleFeature.propTypes = {
    feature: PropTypes.object.isRequired,
};

export default ArticleFeature;
