import React from 'react';
import { graphql } from 'gatsby';
import * as path from '../path';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Feed from '../components/section/Feed';
import Hero from '../components/section/Hero';
import Button from '../components/unit/Button';
import Image from '../components/unit/Image';
import Link from '../components/unit/Link';

export default ({ location, data }) => {
    const { collections, results, splash, introduction, collection, result, about } = data;
    const loopCollection = collections.edges.map(({ node }) => (
        <article key={node.id} id={`collection-${node.handle}`} className={`collection collection-${node.handle} col-lg-3`}>
            <div className="case d-flex flex-column">
                <header>
                    <h4 className="title">
                        <Link className="stretched-link" to={path.COLLECTION === '/' ? `/${node.handle}` : `${path.COLLECTION}/${node.handle}`}>
                            {node.title}
                        </Link>
                    </h4>
                    <p className="description" dangerouslySetInnerHTML={{ __html: node.description }} />
                </header>
                <footer className="mt-auto text-right">
                    <p className="action">View Tests &rarr;</p>
                </footer>
            </div>
        </article>
    ));
    const loopCollectionButton = collections.edges.map(({ node }) => (
        <Button key={node.id} label={node.title} kind="alternate" size="lg" display="pill" to={`/${node.handle}`} />
    ));
    const loopResult = results.edges.map(({ node }) => (
        <article key={node.id} id={`result-${node.slug}`} className={`result result-${node.slug}`}>
            <div className="row align-items-center gutter-50 gutter-lg-80">
                <div className="col-xl">
                    <figure className="cheat-left">
                        <Image className="image" source={node.image.fluid} alternate={node.title} />
                    </figure>
                </div>
                <div className="col-xl">
                    <header dangerouslySetInnerHTML={{ __html: node.body.childMarkdownRemark.html }} />
                </div>
            </div>
        </article>
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
                            <div className="action-group">{loopCollectionButton}</div>
                        </footer>
                    </div>
                </Hero>
            )}
            {introduction && (
                <Basic id={introduction.slug} space="space-xs-80 space-lg-130" color={0}>
                    <header className="copy text-center" dangerouslySetInnerHTML={{ __html: introduction.body.childMarkdownRemark.html }} />
                </Basic>
            )}
            {collections.edges.length > 0 && (
                <Feed id="collections" space="space-xs-80 space-lg-130" item="collection">
                    {collection.body && (
                        <header
                            className="copy node-xs-50 text-lg-center"
                            dangerouslySetInnerHTML={{ __html: collection.body.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 cheat-both">
                        <div className="row justify-content-center gutter-80-30">{loopCollection}</div>
                    </section>
                </Feed>
            )}
            {results.edges.length > 0 && (
                <Feed id="results" space="space-xs-80 space-lg-130" item="result">
                    {result.body && (
                        <header
                            className="copy node-xs-50 text-lg-center"
                            dangerouslySetInnerHTML={{ __html: result.body.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50">{loopResult}</section>
                </Feed>
            )}
            {about && (
                <Basic id={about.slug} space="space-xs-80 space-lg-130" color={2}>
                    <header className="copy text-center node-xs-50">
                        <h3>{about.title}</h3>
                    </header>
                    <figure className="node-xs-50">
                        <Image className="image" source={about.image.fluid} alternate={about.title} />
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
                    id
                    handle
                    title
                    description
                }
            }
        }
        results: allContentfulResult(sort: { fields: order, order: ASC }) {
            edges {
                node {
                    id
                    title
                    slug
                    image {
                        ...imageHigh
                    }
                    body {
                        childMarkdownRemark {
                            html
                        }
                    }
                }
            }
        }
        splash: contentfulHero(slug: { eq: "splash" }) {
            ...contentSplash
        }
        introduction: contentfulGeneral(slug: { eq: "introduction" }) {
            ...contentGeneral
        }
        collection: contentfulGeneral(slug: { eq: "collection" }) {
            ...contentGeneral
        }
        result: contentfulGeneral(slug: { eq: "result" }) {
            ...contentGeneral
        }
        about: contentfulGeneral(slug: { eq: "about" }) {
            ...contentGeneral
        }
    }
`;
