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
import ArticleFeature from '../components/project/ArticleFeature';
import ArticleResult from '../components/project/ArticleResult';
import ArticleStep from '../components/project/ArticleStep';
import CarouselSlide from '../components/project/CarouselSlide';

export default ({ location, data }) => {
    const { slides, collections, features, steps, results, splash, introduction, collection, feature, step, result, about } = data;
    const loopCollectionButton = collections.edges.map(({ node: collection }) => (
        <Button
            key={collection.id}
            label={collection.title}
            kind="custom"
            size="lg"
            display="pill"
            className={`btn-collection-${collection.handle}`}
            to={path.COLLECTION === '/' ? `/${collection.handle}` : `${path.COLLECTION}/${collection.handle}`}
        />
    ));
    const loopCollection = collections.edges.map(({ node: collection }) => (
        <article key={collection.id} id={`collection-${collection.handle}`} className={`collection collection-${collection.handle} col-xl-3`}>
            <div className="case d-flex flex-column">
                <header>
                    <h4 className="title">
                        <Link
                            className="stretched-link"
                            to={path.COLLECTION === '/' ? `/${collection.handle}` : `${path.COLLECTION}/${collection.handle}`}
                            children={collection.title}
                        />
                    </h4>
                    <p className="description" dangerouslySetInnerHTML={{ __html: collection.description }} />
                </header>
                <footer className="mt-auto text-right">
                    <p className="action">View Tests &rarr;</p>
                </footer>
            </div>
        </article>
    ));
    const loopStep = steps.edges.map(({ node: step }) => <ArticleStep key={step.id} step={step} />);
    const loopFeature = features.edges.map(({ node: feature }) => <ArticleFeature key={feature.id} feature={feature} />);
    const loopResult = results.edges.map(({ node: result }) => <ArticleResult key={result.id} result={result} />);
    return (
        <Layout template="home" location={location}>
            {splash && (
                <Hero id={splash.slug} height={splash.height} space="space-xs-50 space-lg-80" color={4}>
                    <div className="node-xs-50 node-lg-80">
                        <div className="row align-items-center gutter-80">
                            <div className="col-lg-6">
                                <header dangerouslySetInnerHTML={{ __html: splash.body.childMarkdownRemark.html }} />
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <CarouselSlide
                                    id="carousel-collection"
                                    height="auto"
                                    controls={false}
                                    indicators={false}
                                    interval={3000}
                                    slides={slides}
                                    fade
                                />
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
                <Basic id={introduction.slug} space="space-xs-50 space-lg-80" color={6}>
                    <aside className="cap d-none d-lg-block">
                        <figure className="candy">
                            <Image className="image" source={introduction.image.fluid} alternate={introduction.title} />
                        </figure>
                        {false && <div className="circle" />}
                    </aside>
                    <header className="copy text-center" dangerouslySetInnerHTML={{ __html: introduction.body.childMarkdownRemark.html }} />
                </Basic>
            )}
            {steps.edges.length > 0 && (
                <Feed id="steps" space="space-xs-50 space-lg-80" item="step">
                    {step.body && (
                        <header
                            className="copy node-xs-50 node-lg-80 text-center"
                            dangerouslySetInnerHTML={{ __html: step.body.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-50 gutter-lg-80">{loopStep}</div>
                    </section>
                </Feed>
            )}
            {features.edges.length > 0 && (
                <Feed id="features" space="space-xs-50 space-lg-80" color={4} item="feature">
                    <aside className="cap d-none d-lg-block">
                        <figure className="candy">
                            <Image className="image" source={feature.image.fluid} alternate={feature.title} />
                        </figure>
                    </aside>
                    {feature.body && (
                        <header
                            className="copy node-xs-50 node-lg-80 text-center"
                            dangerouslySetInnerHTML={{ __html: feature.body.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-50 gutter-lg-80">
                            <div className="col-xl">
                                <figure className="cheat-left style-shadow-lg">
                                    <Image className="image" source={feature.figure.fluid} alternate={feature.title} />
                                </figure>
                            </div>
                            <div className="col-xl">{loopFeature}</div>
                        </div>
                    </section>
                </Feed>
            )}
            {collections.edges.length > 0 && (
                <Feed id="collections" space="space-xs-50 space-lg-80" item="collection">
                    {collection.body && (
                        <header
                            className="copy node-xs-50 text-center"
                            dangerouslySetInnerHTML={{ __html: collection.body.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 cheat-both">
                        <div className="row justify-content-center gutter-80-30">{loopCollection}</div>
                    </section>
                </Feed>
            )}
            {results.edges.length > 0 && (
                <Feed id="results" space="space-xs-50 space-lg-80" item="result">
                    {result.body && (
                        <header className="copy node-xs-50 text-center" dangerouslySetInnerHTML={{ __html: result.body.childMarkdownRemark.html }} />
                    )}
                    <section className="node-xs-50">{loopResult}</section>
                </Feed>
            )}
            {about && (
                <Basic id={about.slug} space="space-xs-50 space-lg-80" color={4}>
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
        slides: allContentfulSlide {
            edges {
                node {
                    id
                    title
                    slug
                    image {
                        ...imageFade
                    }
                    order
                }
            }
        }
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
        features: allContentfulFeature(sort: { fields: order, order: ASC }) {
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
                    order
                }
            }
        }
        steps: allContentfulStep(sort: { fields: order, order: ASC }) {
            edges {
                node {
                    ...contentStep
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
        feature: contentfulGeneral(slug: { eq: "feature" }) {
            ...contentGeneral
        }
        step: contentfulGeneral(slug: { eq: "step" }) {
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
