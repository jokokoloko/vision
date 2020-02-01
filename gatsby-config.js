require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        siteUrl: 'https://myhealthconfirm.com/',
        title: 'HealthConfirm',
        description:
            'HealthConfirm offers a convenient, customized at-home testing experience designed to help you better understand your body’s balance and achieve optimal wellness.',
        author: 'Confirm BioSciences',
    },
    plugins: [
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: process.env.GOOGLE_TAGMANAGER_ID,
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'HealthConfirm',
                short_name: 'HealthConfirm',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#1fa9e1',
                display: 'standalone',
                icon: 'src/images/icon.png',
                crossOrigin: 'use-credentials',
            },
        },
        'gatsby-plugin-netlify',
        'gatsby-plugin-offline',
        'gatsby-plugin-polyfill-io',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-sharp',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
                accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
            },
        },
        {
            resolve: 'gatsby-source-shopify',
            options: {
                shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
                accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
                includeCollections: ['shop'],
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images-contentful',
                        options: {
                            maxWidth: 1110,
                            withWebp: true,
                        },
                    },
                    'gatsby-remark-responsive-iframe',
                ],
            },
        },
        'gatsby-transformer-sharp',
    ],
};
