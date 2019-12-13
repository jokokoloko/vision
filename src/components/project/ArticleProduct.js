import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import * as path from '../../path';
import { ShopContext } from '../../contexts/shop';
import Image from '../unit/Image';
import Link from '../unit/Link';

const ArticleProduct = ({ product }) => {
    const { addProductToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
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
                                <input type="submit" className="btn btn-default btn-lg btn-initial no-class" name="submit" value="Add to cart" />
                            </div>
                        </div>
                    </form>
                </footer>
            </div>
        </article>
    );
};

ArticleProduct.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ArticleProduct;
