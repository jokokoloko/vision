import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { addCommasToNumber } from '../function';
import { logicDescription } from '../logic';
import * as path from '../path';
import useSite from '../queries/useSite';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Gallery from '../components/project/Gallery';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
    const { name: siteName, currency } = useSite();
    const { product, content } = data;
    const {
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
    const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        '@id': path.PRODUCT + '/' + product.handle,
        name: product.title,
        image: product.images[0].originalSrc,
        description: content.excerpt.excerpt,
        brand: siteName,
        sku: firstVariant.sku,
        gtin13: content.barcode,
        offers: {
            '@type': 'Offer',
            url: path.PRODUCT + '/' + product.handle,
            priceCurrency: currency,
            price: addCommasToNumber(firstVariant.price),
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '3',
        },
    };
    return (
        <Layout
            template={`single single-product single-product-${product.handle}`}
            title={product.title}
            description={logicDescription(product)}
            location={location}
            other
        >
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <Basic id="product" space="space-xs-50 space-lg-80">
                <div className="row gutter-80">
                    <div className="col-lg-6 order-lg-last">
                        <header className="product-header node-xs-30">
                            <h1 className="title">{product.title}</h1>
                            <h2 className="type">{product.productType}</h2>
                            <p className="price">${addCommasToNumber(firstVariant.price)}</p>
                        </header>
                        <section className="product-section node-xs-30">
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
                                        <input type="submit" className="btn btn-main btn-lg btn-pill do-add" name="submit" value="Add to Cart" />
                                    </div>
                                </div>
                            </form>
                        </section>
                        {content && content.excerpt && (
                            <section className="product-section node-xs-30 node-division">
                                <p className="description" dangerouslySetInnerHTML={{ __html: content.excerpt.excerpt }} />
                            </section>
                        )}
                    </div>
                    <div className="col-lg-6">
                        <div className="cheat-left">{content && content.gallery && <Gallery gallery={content.gallery} />}</div>
                    </div>
                </div>
            </Basic>
            {content && (content.head || content.body) && (
                <Basic id="content" className="single-product-color" space="space-xs-50 space-lg-80">
                    <section className="content-body copy" dangerouslySetInnerHTML={{ __html: content.body.childMarkdownRemark.html }} />
                </Basic>
            )}
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
                ...imageShopify
                originalSrc
            }
            variants {
                shopifyId
                price
                sku
            }
            productType
        }
        content: contentfulProduct(handle: { eq: $handle }) {
            title
            handle
            gallery {
                file {
                    url
                }
            }
            body {
                childMarkdownRemark {
                    html
                    excerpt
                }
            }
            excerpt {
                excerpt
            }
        }
    }
`;
