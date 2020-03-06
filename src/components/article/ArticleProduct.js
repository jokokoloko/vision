import React from 'react';
import PropTypes from 'prop-types';
import { addCommasToNumber } from '../../function';
import * as path from '../../path';
import Image from '../unit/Image';
import Link from '../unit/Link';

const ArticleProduct = ({ product }) => {
    const {
        images: [firstImage],
        variants: [firstVariant],
    } = product;
    return (
        <article key={product.id} id={`product-${product.handle}`} className={`product product-${product.handle} col-lg-6 col-xl-3`}>
            <div className="case d-flex flex-column">
                {firstImage && (
                    <figure className="product-color">
                        <div className="pod">
                            <Image className="image style-shadow-lg" source={firstImage.localFile.childImageSharp.fluid} alternate={product.title} />
                        </div>
                    </figure>
                )}
                <header>
                    <div className="pod">
                        <h3 className="title">
                            <Link className="stretched-link" to={path.PRODUCT === '/' ? `/${product.handle}` : `${path.PRODUCT}/${product.handle}`}>
                                {product.title}
                            </Link>
                        </h3>
                        <h4 className="type">{product.productType}</h4>
                    </div>
                </header>
                {product.descriptionHtml && (
                    <section>
                        <div className="pod" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </section>
                )}
                <footer className="d-flex justify-content-between mt-auto">
                    <div className="pod">
                        <p className="price">${addCommasToNumber(firstVariant.price)}</p>
                    </div>
                    <div className="pod">
                        <p className="action">Learn More &rarr;</p>
                    </div>
                </footer>
            </div>
        </article>
    );
};

ArticleProduct.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ArticleProduct;
