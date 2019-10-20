import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';

export default ({ location, data }) => {
    const { product } = data;
    const {
        images: [firstImage],
        variants: [firstVariant],
    } = product;
    return (
        <Layout
            template={`single single-product single-product-${product.handle}`}
            title={product.title}
            description={logicDescription(product)}
            location={location}
        >
            <Basic id={`product-${product.handle}`} space="space-custom">
                <div className="row gutter-80">
                    <div className="col-lg-6">
                        <figure className="node-xs-50">
                            <img className="img-fluid" src={firstImage.originalSrc} alt={product.title} />
                        </figure>
                    </div>
                    <div className="col-lg-6">
                        <header className="product-header node-xs-50">
                            <h1>{product.title}</h1>
                            <p className="price">${firstVariant.price}</p>
                        </header>
                        <footer className="product-footer node-xs-50">
                            <button type="button" className="btn btn-default btn-lg btn-initial no-class">
                                Add to cart
                            </button>
                        </footer>
                    </div>
                </div>
            </Basic>
        </Layout>
    );
};

export const query = graphql`
    query productByHandle($handle: String!) {
        product: shopifyProduct(handle: { eq: $handle }) {
            id
            handle
            title
            images {
                originalSrc
            }
            variants {
                price
            }
        }
    }
`;
