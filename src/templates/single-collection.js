import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import * as path from '../path';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Link from '../components/unit/Link';
import MenuCollection from '../components/project/MenuCollection';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const { collection } = data;
    const loopCollection = collection.products.map((product) => {
        const {
            images: [firstImage],
            variants: [firstVariant],
        } = product;
        const onClick = () => addProductToCart(firstVariant.shopifyId);
        return (
            <article key={product.id} id={`product-${product.handle}`} className="product col-lg-4">
                <div className="case relative node-xs-50">
                    {firstImage && (
                        <figure className="node-xs-50">
                            <img className="img-fluid" src={firstImage.originalSrc} alt={product.title} />
                        </figure>
                    )}
                    <header className="node-xs-50">
                        <h3>
                            <Link className="stretched-link" to={path.PRODUCT === '/' ? `/${product.handle}` : `${path.PRODUCT}/${product.handle}`}>
                                {product.title}
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
                    <section className="node-xs-50 node-lg-80 cheat-both">
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
                description
                productType
                variants {
                    shopifyId
                    title
                    price
                    availableForSale
                }
                images {
                    originalSrc
                }
            }
        }
    }
`;
