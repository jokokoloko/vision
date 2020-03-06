import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../components/section/Hero';

export default ({ location, data }) => {
    const { splash } = data;
    return (
        <Layout template="home" location={location}>
            {splash && (
                <Hero id={splash.slug} height={splash.height} space="space-xs-80 space-lg-130">
                    <header dangerouslySetInnerHTML={{ __html: splash.body.childMarkdownRemark.html }} />
                </Hero>
            )}
        </Layout>
    );
};

export const query = graphql`
    query pageHome {
        splash: contentfulHero(slug: { eq: "splash" }) {
            ...contentSplash
        }
    }
`;
