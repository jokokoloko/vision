import React, { useContext } from 'react';
import { addCommasToNumber } from '../../function';
import { ShopContext } from '../../contexts/shop';
import useBillboard from '../../queries/useBillboard';
import Image from '../unit/Image';

const Billboard = () => {
    const { addProductToCart } = useContext(ShopContext);
    const {
        title,
        images: [firstImage],
        variants: [firstVariant],
    } = useBillboard();
    const onClick = () => addProductToCart(firstVariant.shopifyId, 1);
    return (
        <aside className="billboard panel d-flex align-items-center justify-content-between">
            <div className="row">
                <div className="col-auto d-flex align-items-center">
                    <div className="billboard-image">
                        <Image className="image fit exact-center" source={firstImage.localFile.childImageSharp.fluid} alternate={title} />
                    </div>
                </div>
                <div className="col d-flex flex-column flex-content-between">
                    <strong className="title">{title}</strong>
                </div>
                <div className="col-3 d-flex flex-column flex-content-between align-items-end">
                    <button type="button" className="btn btn-default btn-md do-add" onClick={onClick}>
                        Add
                    </button>
                    <p className="price">${addCommasToNumber(firstVariant.price)}</p>
                </div>
            </div>
        </aside>
    );
};

export default Billboard;
