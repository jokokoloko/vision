import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import useSite from '../queries/useSite';

const SEO = ({ location, template, title: pageTitle, description: pageDescription, article, other }) => {
    const defaultImage = '';
    const { defaultDescription, name: siteName } = useSite();
    const metaDescription = pageDescription || defaultDescription;
    const itemListElement = [
        {
            '@type': 'ListItem',
            item: {
                '@id': '/',
                name: 'Homepage',
            },
            position: 1,
        },
    ];
    const schemaBreadcrumb = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        description: 'Breadcrumbs list',
        name: 'Breadcrumbs',
        itemListElement,
    };
    const schemaOrganization = {};
    return (
        <Helmet defaultTitle={siteName} titleTemplate={location.pathname === '/' ? '%s' : `%s - ${siteName}`} title={pageTitle}>
            <html lang="en" />
            <body id="body" className={template} />

            <link rel="canonical" href={location.href} />

            <meta name="description" content={metaDescription} />
            <meta name="image" content={defaultImage} />

            {(article ? true : null) && <meta property="og:type" content="article" />}
            <meta property="og:url" content={location.href} />
            <meta property="og:site_name" content={siteName} />
            {pageTitle && <meta property="og:title" content={pageTitle} />}
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={template.includes('single') ? 'article' : 'website'} />
            {false && <meta property="og:image" content={defaultImage} />}
            {false && <meta property="og:image:width" content="1200" />}
            {false && <meta property="og:image:height" content="630" />}

            <meta name="twitter:site" content={location.href} />
            <meta name="twitter:creator" content={siteName} />
            {pageTitle && <meta name="twitter:title" content={pageTitle} />}
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:card" content="summary_large_image" />
            {false && <meta name="twitter:image" content={defaultImage} />}

            <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
            {!other && <script type="application/ld+json">{JSON.stringify(schemaOrganization)}</script>}
        </Helmet>
    );
};

SEO.propTypes = {
    location: PropTypes.object.isRequired,
    template: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    article: PropTypes.bool,
    other: PropTypes.bool,
};

SEO.defaultProps = {
    title: undefined,
    description: undefined,
    article: undefined,
    other: undefined,
};

export default SEO;
