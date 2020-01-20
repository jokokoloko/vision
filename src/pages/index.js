import React from 'react';
import { graphql } from 'gatsby';
import { generateID } from '../function';
import Layout from '../components/Layout';
import Button from '../components/unit/Button';
import Hero from '../components/section/Hero';

export default ({ location, data }) => {
    const { collections, splash } = data;
    const loopCollection = collections.edges.map(({ node }) => (
        <Button key={generateID()} label={node.title} kind="alternate" size="lg" display="pill" to={`/${node.handle}`} />
    ));
    return (
        <Layout template="home" location={location}>
            {splash && (
                <Hero id={splash.slug} height={splash.height} space="space-xs-80 space-lg-130" color={4}>
                    <div className="node-xs-50 node-lg-80">
                        <div className="row gutter-80">
                            <div className="col-lg-6">
                                <header dangerouslySetInnerHTML={{ __html: splash.body.childMarkdownRemark.html }} />
                            </div>
                        </div>
                    </div>
                    <div className="node-xs-50 node-lg-80">
                        <footer className="text-center">
                            <h3>{splash.action}</h3>
                            <div className="action-group">{loopCollection}</div>
                        </footer>
                    </div>
                </Hero>
            )}
        </Layout>
    );
};

export const query = graphql`
    query pageHome {
        collections: allShopifyCollection {
            edges {
                node {
                    title
                    handle
                }
            }
        }
        splash: contentfulHero(slug: { eq: "splash" }) {
            ...contentSplash
        }
    }
`;
