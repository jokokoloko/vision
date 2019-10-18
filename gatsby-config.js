require('dotenv').config();

module.exports = {
    siteMetadata: {
        siteUrl: 'https://dreamy-khorana-1f4974.netlify.com/',
        title: 'Ghost',
        description: 'a Gatsby + Contentful + Netlify starter',
        author: 'Jonathan Howland',
    },
    plugins: [
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Ghost',
                short_name: 'Ghost',
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
