import React from 'react';
import { graphql } from 'gatsby';
import { generateID } from '../function';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Hero from '../components/section/Hero';
import Button from '../components/unit/Button';
import Image from '../components/unit/Image';

export default ({ location, data }) => {
    const { collections, splash, introduction, about } = data;
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
            {introduction && (
                <Basic id={introduction.slug} space="space-xs-50 space-lg-80" color={0}>
                    <header className="copy text-center" dangerouslySetInnerHTML={{ __html: introduction.body.childMarkdownRemark.html }} />
                </Basic>
            )}
            {about && (
                <Basic id={about.slug} space="space-xs-80 space-lg-130" color={2}>
                    <header className="copy text-center node-xs-50">
                        <h3>{about.title}</h3>
                    </header>
                    <figure className="node-xs-50">
                        <Image className="image" source={about.image.fluid} alternate="Report" />
                    </figure>
                    <section className="copy text-center node-xs-50" dangerouslySetInnerHTML={{ __html: about.body.childMarkdownRemark.html }} />
                </Basic>
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
        introduction: contentfulGeneral(slug: { eq: "introduction" }) {
            ...contentGeneral
        }
        about: contentfulGeneral(slug: { eq: "about" }) {
            ...contentGeneral
        }
    }
`;
