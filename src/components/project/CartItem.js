import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
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
            <div className="row align-items-center">
                <div className="col-auto">
                    <div className="cart-line-item-image">
                        <img className="image fit exact-center img-fluid" src={item.variant.image.src} alt={item.title} />
                    </div>
                </div>
                <div className="col">
                    <p className="title">{item.title}</p>
                </div>
                <div className="col-2">
                    <p className="price">${item.variant.price}</p>
                </div>
                <div className="col-2">
                    <form id={`form-${item.id.substring(58, 64)}`} className="form">
                        <input
                            type="number"
                            id={`quantity-${item.id.substring(58, 64)}`}
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
                <div className="col-1">
                    <button type="button" className="btn btn-default btn-md do-remove" onClick={onClick}>
                        X
                    </button>
                </div>
            </div>
        </li>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItem;
