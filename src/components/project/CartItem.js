import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { addCommasToNumber } from '../../function';
import { ShopContext } from '../../contexts/shop';

const CartItem = ({ item }) => {
    const { updateQuantity, removeProductFromCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState('1');
    const onChange = (event) => {
        const value = event.target.value;
        if (value === quantity) {
            return;
        }
        if (value === '') {
            setQuantity(value);
            return;
        }
        setQuantity(value);
        updateQuantity(item.id, Number(value));
    };
    const onBlur = () => setQuantity(item.quantity.toString());
    const onClick = () => removeProductFromCart(item.id);
    useEffect(() => {
        setQuantity(item.quantity.toString());
    }, [item.quantity]);
    return (
        <li className="cart-line-item">
            <div className="row">
                <div className="col-auto d-flex align-items-center">
                    <div className="cart-line-item-image">
                        <img className="image fit exact-center img-fluid" src={item.variant.image.src} alt={item.title} />
                    </div>
                </div>
                <div className="col d-flex flex-column flex-content-between">
                    <p className="title">{item.title}</p>
                    <form className="form">
                        <input
                            type="number"
                            className="form-control form-control-md"
                            name="quantity"
                            inputMode="numeric"
                            min="1"
                            step="1"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={quantity}
                            aria-label="quantity"
                        />
                    </form>
                </div>
                <div className="col-3 d-flex flex-column flex-content-between align-items-end">
                    <button type="button" className="btn btn-default btn-md do-remove" onClick={onClick}>
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
