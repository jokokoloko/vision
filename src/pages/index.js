import React from 'react';
import { graphql } from 'gatsby';
import * as path from '../path';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Hero from '../components/section/Hero';
import Link from '../components/unit/Link';

export default ({ location, data }) => {
    const { collections, splash } = data;
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
    return (
        <Layout template="home" location={location}>
            {splash && (
                <Hero id={splash.slug} height={splash.height} space="space-xs-80 space-lg-130">
                    <header dangerouslySetInnerHTML={{ __html: splash.body.childMarkdownRemark.html }} />
                </Hero>
            )}
            {collections.edges.length > 0 && (
                <Feed id="collections" space="space-xs-50 space-lg-80" item="collection">
                    <section className="node-xs-50 cheat-both">
                        <div className="row justify-content-center gutter-80-30">{loopCollection}</div>
                    </section>
                </Feed>
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
        splash: contentfulHero(slug: { eq: "splash" }) {
            ...contentSplash
        }
    }
`;
