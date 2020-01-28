import React from 'react';
import PropTypes from 'prop-types';
import { logicDescription } from '../../logic';
import Image from '../unit/Image';

const ArticleSymptom = ({ symptom }) => (
    <article id={`symptom-${symptom.slug}`} className={`symptom symptom-${symptom.order} col-6 col-md-4 col-xl-2`}>
        <figure className="node-xs-50">
            <Image className="image" source={symptom.image.fluid} alternate={symptom.title} />
        </figure>
        <header className="node-xs-50 text-center">
            <h4 className="title">{symptom.title}</h4>
            {symptom.excerpt && <p className="excerpt" dangerouslySetInnerHTML={{ __html: logicDescription(symptom) }} />}
        </header>
    </article>
);

ArticleSymptom.propTypes = {
    symptom: PropTypes.object.isRequired,
};

export default ArticleSymptom;
