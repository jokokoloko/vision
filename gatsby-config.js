require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        siteUrl: 'https://github.com/Confirm-Biosciences/confirm',
        title: 'Confirm',
        description: 'a Gatsby + Contentful + Shopify + Netlify starter',
        author: 'Confirm BioSciences',
    },
    plugins: [
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Confirm',
                short_name: 'Confirm',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#222222',
                display: 'standalone',
                icon: 'src/images/icon.png',
                crossOrigin: 'use-credentials',
            },
        },
        'gatsby-plugin-netlify',
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-sharp',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },
        {
            resolve: 'gatsby-source-shopify',
            options: {
                shopName: process.env.SHOPIFY_SHOP_NAME,
                accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
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
    ],
};
