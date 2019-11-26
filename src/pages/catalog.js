import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import * as path from '../path';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Image from '../components/unit/Image';
import Link from '../components/unit/Link';
import MenuCollection from '../components/project/MenuCollection';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const { products, page } = data;
    const loopProduct = products.edges.map(({ node }) => {
        const {
            images: [firstImage],
            variants: [firstVariant],
        } = node;
        const onClick = () => addProductToCart(firstVariant.shopifyId);
        return (
            <article key={node.id} id={`product-${node.handle}`} className="product col-lg-4">
                <div className="case relative node-xs-50">
                    {firstImage && (
                        <figure className="node-xs-50">
                            <Image className="image" source={firstImage.localFile.childImageSharp.fluid} alternate={node.title} />
                        </figure>
                    )}
                    <header className="node-xs-50">
                        <h3>
                            <Link className="stretched-link" to={path.PRODUCT === '/' ? `/${node.handle}` : `${path.PRODUCT}/${node.handle}`}>
                                {node.title}
                            </Link>
                        </h3>
                        <p className="price">${firstVariant.price}</p>
                    </header>
                </div>
                <div className="case node-xs-50">
                    <footer>
                        <button type="button" className="btn btn-default btn-lg btn-initial no-class" onClick={onClick}>
                            Add to cart
                        </button>
                    </footer>
                </div>
            </article>
        );
    });
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
                    <section className="node-xs-50 node-lg-80 cheat-both">
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
        products: allShopifyProduct(sort: { fields: publishedAt, order: DESC }) {
            edges {
                node {
                    id
                    handle
                    title
                    variants {
                        shopifyId
                        price
                    }
                    images {
                        ...imageShopify
                    }
                }
            }
        }
        page: contentfulPage(slug: { eq: "catalog" }) {
            ...contentPage
        }
    }
`;
