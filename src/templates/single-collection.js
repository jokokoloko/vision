import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import ArticleProduct from '../components/project/ArticleProduct';
import MenuCollection from '../components/project/MenuCollection';

export default ({ location, data }) => {
    const { collection } = data;
    const loopCollection = collection.products.map((product) => <ArticleProduct key={product.id} product={product} />);
    return (
        <Layout
            template={`collection collection-${collection.handle}`}
            title={collection.title}
            description={logicDescription(collection)}
            location={location}
        >
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
                    <footer className="node-xs-50 node-lg-80">
                        <MenuCollection />
                    </footer>
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
    }
`;
