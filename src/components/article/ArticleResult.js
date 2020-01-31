import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const ArticleResult = ({ result }) => (
    <article id={`result-${result.slug}`} className={`result result-${result.slug}`}>
        <div className="row align-items-center gutter-50 gutter-lg-80">
            {result.image && (
                <div className="col-xl">
                    <figure className="cheat-left">
                        <Image className="image" source={result.image.fluid} alternate={result.title} />
                    </figure>
                </div>
            )}
            {result.body && (
                <div className="col-xl">
                    <header dangerouslySetInnerHTML={{ __html: result.body.childMarkdownRemark.html }} />
                </div>
            )}
        </div>
    </article>
);

ArticleResult.propTypes = {
    result: PropTypes.object.isRequired,
};

export default ArticleResult;
