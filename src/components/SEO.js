import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import useSite from '../queries/useSite';

const SEO = ({ location, template, title: pageTitle, description: pageDescription }) => {
    const defaultOGImage = '';
    const { description, name: title } = useSite();
    const metaDescription = pageDescription || description;
    return (
        <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`} title={pageTitle}>
            <html lang="en" />
            <body id="body" className={template} />
            <link rel="canonical" href={location.href} />
            <meta name="description" content={metaDescription} />
            <meta property="og:url" content={location.href} />
            <meta property="og:site_name" content={title} />
            {pageTitle && <meta property="og:title" content={pageTitle} />}
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={template.includes('single') ? 'article' : 'website'} />
            {false && <meta property="og:image" content={defaultOGImage} />}
            {false && <meta property="og:image:width" content="1200" />}
            {false && <meta property="og:image:height" content="630" />}
            <meta name="twitter:site" content={location.href} />
            <meta name="twitter:creator" content={title} />
            {pageTitle && <meta name="twitter:title" content={pageTitle} />}
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:card" content="summary_large_image" />
            {false && <meta name="twitter:image" content={defaultOGImage} />}
        </Helmet>
    );
};

SEO.propTypes = {
    location: PropTypes.object.isRequired,
    template: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
};

SEO.defaultProps = {
    title: undefined,
    description: undefined,
};

export default SEO;
