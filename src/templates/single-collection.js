import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import * as style from '../style';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Hero from '../components/section/Hero';
import ArticleProduct from '../components/project/ArticleProduct';

export default ({ location, data }) => {
    const { collection, content } = data;
    const loopCollection = collection.products.map((product) => <ArticleProduct key={product.id} product={product} />);
    return (
        <Layout
            template={`collection collection-${collection.handle}`}
            title={collection.title}
            description={logicDescription(collection)}
            location={location}
        >
            <Hero id={`hero-${collection.handle}`} height="short" color={style.HERO_COLOR} alternate={collection.title}>
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
                <Feed id={`feed-${collection.handle}`} space="space-custom" item="product">
                    {collection.title && (
                        <header className="copy node-xs-50 node-lg-80 text-lg-center">
                            <h1>{collection.title}</h1>
                            <h2>{collection.description}</h2>
                        </header>
                    )}
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-80">{loopCollection}</div>
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
                images {
                    ...imageShopify
                }
                variants {
                    shopifyId
                    price
                }
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
