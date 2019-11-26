import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Image from '../components/unit/Image';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const { product } = data;
    const {
        images: [firstImage],
        variants: [firstVariant],
    } = product;
    const onClick = () => addProductToCart(firstVariant.shopifyId);
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
                        {firstImage && (
                            <figure className="node-xs-50">
                                <Image className="image" source={firstImage.localFile.childImageSharp.fluid} alternate={product.title} />
                            </figure>
                        )}
                    </div>
                    <div className="col-lg-6">
                        <header className="product-header node-xs-50">
                            <h1>{product.title}</h1>
                            <p className="price">${firstVariant.price}</p>
                        </header>
                        <section className="product-section node-xs-50">
                            <button type="button" className="btn btn-default btn-lg btn-initial no-class" onClick={onClick}>
                                Add to cart
                            </button>
                        </section>
                        <footer className="product-footer node-xs-50">
                            <p className="description">{product.description}</p>
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
            description
            variants {
                shopifyId
                price
            }
            images {
                ...imageShopify
            }
        }
    }
`;
