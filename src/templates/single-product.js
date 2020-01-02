import React, { useState, useContext } from 'react';
import { graphql } from 'gatsby';
import { addCommasToNumber } from '../function';
import { logicDescription } from '../logic';
import { ShopContext } from '../contexts/shop';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Feed from '../components/section/Feed';
import ArticleSymptom from '../components/project/ArticleSymptom';
import ArticleTest from '../components/project/ArticleTest';
import Gallery from '../components/project/Gallery';

export default ({ location, data }) => {
    const { addProductToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
    const { product, content, symptoms, tests } = data;
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
    const loopSymptom = symptoms.edges.map(({ node: symptom }) => <ArticleSymptom key={symptom.id} symptom={symptom} />);
    const loopTest = tests.edges.map(({ node: test }) => <ArticleTest key={test.id} test={test} />);
    return (
        <Layout
            template={`single single-product single-product-${product.handle}`}
            title={product.title}
            description={logicDescription(product)}
            location={location}
        >
            <Basic id={`product-${product.handle}`} space="space-product">
                <div className="row gutter-80">
                    <div className="col-lg-6">
                        <Gallery />
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
            {content && (content.head || content.body) && (
                <Basic id={`content-${product.handle}`} space="space-xs-80 space-md-130 space-xl-210">
                    <div className="row gutter-80">
                        <div className="col-lg-6">
                            <header className="content-head" dangerouslySetInnerHTML={{ __html: content.head.childMarkdownRemark.html }} />
                        </div>
                        <div className="col-lg-6">
                            <section className="content-body panel" dangerouslySetInnerHTML={{ __html: content.body.childMarkdownRemark.html }} />
                        </div>
                    </div>
                </Basic>
            )}
            {loopSymptom.length > 0 && (
                <Feed id="feed-symptom" space="space-xs-80 space-md-130 space-xl-210" item="symptom">
                    <header className="node-xs-50 node-lg-80 text-lg-center">
                        <h3>Symptoms</h3>
                    </header>
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-50 gutter-lg-80">{loopSymptom}</div>
                    </section>
                </Feed>
            )}
            {loopTest.length > 0 && (
                <Feed id="feed-test" space="space-xs-80 space-md-130 space-xl-210" item="test">
                    <header className="node-xs-50 node-lg-80 text-lg-center">
                        <h3>Test Panels Measured</h3>
                    </header>
                    <section className="node-xs-50 node-lg-80">
                        <div className="row gutter-50 gutter-lg-80">{loopTest}</div>
                    </section>
                </Feed>
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
            description
            images {
                ...imageShopify
            }
            variants {
                shopifyId
                price
            }
        }
        content: contentfulProduct(handle: { eq: $handle }) {
            title
            handle
            head {
                childMarkdownRemark {
                    html
                    excerpt
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
        symptoms: allContentfulSymptom(filter: { product: { elemMatch: { handle: { eq: $handle } } } }, sort: { fields: order, order: ASC }) {
            edges {
                node {
                    ...contentSymptom
                }
            }
        }
        tests: allContentfulTest(filter: { product: { elemMatch: { handle: { eq: $handle } } } }, sort: { fields: order, order: ASC }) {
            edges {
                node {
                    ...contentTest
                }
            }
        }
    }
`;
