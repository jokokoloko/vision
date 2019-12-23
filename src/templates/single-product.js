import React, { useState, useContext } from 'react';
import { graphql } from 'gatsby';
import { addCommasToNumber } from '../function';
import { logicDescription } from '../logic';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Image from '../components/unit/Image';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
    const { product } = data;
    const {
        images: [firstImage],
        variants: [firstVariant],
    } = product;
    const onChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
    };
    const onBlur = () => quantity === '' && setQuantity('1');
    const onSubmit = (event) => {
        event.preventDefault();
        addProductToCart(firstVariant.shopifyId, Number(quantity));
    };
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
                            <p className="price">${addCommasToNumber(firstVariant.price)}</p>
                        </header>
                        <section className="product-section node-xs-50">
                            <form id={`form-product-${product.id.substring(58, 64)}`} className="form form-lg" onSubmit={onSubmit}>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        id={`quantity-${product.id.substring(58, 64)}`}
                                        className="form-control form-control-lg form-control-quantity"
                                        name="quantity"
                                        inputMode="numeric"
                                        min="1"
                                        step="1"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={quantity}
                                        aria-label="quantity"
                                    />
                                    <div className="input-group-append">
                                        <input
                                            type="submit"
                                            className="btn btn-default btn-lg btn-initial do-add"
                                            name="submit"
                                            value="Add to cart"
                                        />
                                    </div>
                                </div>
                            </form>
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
            images {
                ...imageShopify
            }
            variants {
                shopifyId
                price
            }
        }
    }
`;
