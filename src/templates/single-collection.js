import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Hero from '../components/section/Hero';
import ArticleProduct from '../components/project/ArticleProduct';

export default ({ location, data }) => {
    const { collection, content } = data;
    const loopCollection = collection.products.map((product) => <ArticleProduct key={product.id} product={product} collection={collection} />);
    return (
        <Layout
            template={`single single-collection single-collection-${collection.handle}`}
            title={collection.title}
            description={logicDescription(collection)}
            location={location}
        >
            <Hero id={`hero-${collection.handle}`} height="short" alternate={collection.title}>
                {content.head ? (
                    <header
                        className="node-xs-30 node-lg-50 text-center"
                        dangerouslySetInnerHTML={{ __html: content.head.childMarkdownRemark.html }}
                    />
                ) : (
                    <header className="node-xs-30 node-lg-50 text-center">
                        <h1>{collection.title}</h1>
                        <h2>{logicDescription(collection)}</h2>
                    </header>
                )}
            </Hero>
            {collection && collection.products.length > 0 && (
                <Feed id={`feed-${collection.handle}`} space="space-xs-50 space-md-80" item="product">
                    <section className="node-xs-50 node-lg-80 cheat-both">
                        <div className="row justify-content-center gutter-80-30">
                            {(collection.title || collection.description) && (
                                <header id={`collection-${collection.handle}`} className={`collection collection-${collection.handle} col-lg-3`}>
                                    <div className="case">
                                        <h3>{collection.title}</h3>
                                        <p className="description" dangerouslySetInnerHTML={{ __html: collection.description }} />
                                    </div>
                                </header>
                            )}
                            {loopCollection}
                        </div>
                    </section>
                </Feed>
            )}
        </Layout>
    );
};

export const query = graphql`
    query collectionByHandle($handle: String!) {
        collection: shopifyCollection(handle: { eq: $handle }) {
            id
            handle
            title
            description
            products {
                id
                handle
                title
                descriptionHtml
                images {
                    ...imageShopify
                }
                variants {
                    shopifyId
                    price
                }
                productType
            }
        }
        content: contentfulCollection(handle: { eq: $handle }) {
            title
            handle
            head {
                childMarkdownRemark {
                    html
                    excerpt
                }
            }
        }
    }
`;
