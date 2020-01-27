import React from 'react';
import PropTypes from 'prop-types';
import { logicDescription } from '../../logic';
import Image from '../unit/Image';

const ArticleSymptom = ({ symptom }) => (
    <article id={`symptom-${symptom.slug}`} className={`symptom symptom-${symptom.order} col-lg-2`}>
        <figure className="node-xs-50 d-flex justify-content-center">
            <Image className="image" source={symptom.image.fixed} alternate={symptom.title} fixed />
        </figure>
        <header className="node-xs-50 text-center">
            <h4>{symptom.title}</h4>
            {symptom.excerpt && <p className="excerpt" dangerouslySetInnerHTML={{ __html: logicDescription(symptom) }} />}
        </header>
    </article>
);

ArticleSymptom.propTypes = {
    symptom: PropTypes.object.isRequired,
};

export default ArticleSymptom;
