import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { addCommasToNumber } from '../../function';
import { ShopContext } from '../../contexts/shop';

const CartItem = ({ item }) => {
    const { updateQuantity, removeProductFromCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
    const onChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
    };
    const onBlur = () =>
        quantity === item.quantity.toString()
            ? {}
            : quantity === ''
            ? setQuantity(item.quantity.toString())
            : updateQuantity(item.id, Number(quantity));
    const onClick = () => removeProductFromCart(item.id);
    useEffect(() => {
        setQuantity(item.quantity.toString());
    }, [item.quantity]);
    return (
        <li className={`cart-line-item product product-${item.variant.product.handle}`}>
            <div className="row">
                <div className="col-auto">
                    <figure className="cart-line-item-image product-color d-flex align-items-center">
                        <img className="image fit exact-center img-fluid" src={item.variant.image.src} alt={item.title} />
                    </figure>
                </div>
                <div className="col d-flex flex-column flex-content-between">
                    <p className="title">{item.title}</p>
                    <form className="form">
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control form-control-md form-control-quantity-update"
                                name="quantity-update"
                                inputMode="numeric"
                                min="1"
                                step="1"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={quantity}
                                aria-label="quantity"
                            />
                            <div className="input-group-append">
                                <button type="button" className="btn do-update" disabled={quantity === item.quantity.toString()}>
                                    &#x21bb;
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-auto d-flex flex-column flex-content-between align-items-end">
                    <button type="button" className="btn do-remove" onClick={onClick}>
                        X
                    </button>
                    <p className="price">${addCommasToNumber(item.variant.price)}</p>
                </div>
            </div>
        </li>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItem;
