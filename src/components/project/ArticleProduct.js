import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as path from '../../path';
import { ShopContext } from '../../contexts/shop';
import Image from '../unit/Image';
import Link from '../unit/Link';

const ArticleProduct = ({ product }) => {
    const { addProductToCart } = useContext(ShopContext);
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
                        <Image className="image" source={firstImage.localFile.childImageSharp.fluid} alternate={product.title} />
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
};

ArticleProduct.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ArticleProduct;
