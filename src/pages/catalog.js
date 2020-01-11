import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import ArticleProduct from '../components/project/ArticleProduct';
import MenuCollection from '../components/project/MenuCollection';

export default ({ location, data }) => {
    const { products, page } = data;
    const loopProduct = products.edges.map(({ node: product }) => <ArticleProduct key={product.id} product={product} />);
    return (
        <Layout template={`page page-${page.slug}`} title={page.title} description={logicDescription(page)} location={location}>
            {page && products.edges.length > 0 && (
                <Feed id={`feed-${page.slug}`} space="space-custom" item="product">
                    {page.head && (
                        <header
                            className="copy node-xs-50 node-lg-80 text-lg-center"
                            dangerouslySetInnerHTML={{ __html: page.head.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-80">{loopProduct}</div>
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
    query pageCatalog {
        products: allShopifyProduct(sort: { fields: createdAt, order: DESC }) {
            edges {
                node {
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
        page: contentfulPage(slug: { eq: "catalog" }) {
            ...contentPage
        }
    }
`;
