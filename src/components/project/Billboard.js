import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';
import useBillboard from '../../queries/useBillboard';

const Billboard = () => {
    const { addProductToCart } = useContext(ShopContext);
    const {
        title,
        variants: [firstVariant],
    } = useBillboard();
    const onClick = () => addProductToCart(firstVariant.shopifyId, 1);
    return (
        <aside className="billboard panel d-flex align-items-center justify-content-between">
            <h4>{title}</h4>
            <p className="price">${firstVariant.price}</p>
            <button type="button" className="btn btn-default btn-lg btn-initial no-class" onClick={onClick}>
                Add to cart
            </button>
        </aside>
    );
};

export default Billboard;
