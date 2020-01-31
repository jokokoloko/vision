import React, { Fragment, useContext } from 'react';
import { addCommasToNumber } from '../../function';
import { ShopContext } from '../../contexts/shop';
import CartItem from './CartItem';

const Cart = () => {
    const { quantity, checkout, onCartClose } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => <CartItem key={item.id} item={item} />);
    return (
        <div id="cart" className="cart d-flex flex-column">
            <header className="cart-header">
                <div className="pod d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-text to-previous" onClick={onCartClose}>
                        &larr;
                    </button>
                    {checkout.lineItems.length > 0 && (
                        <a className="btn btn-text to-checkout" href={checkout.webUrl}>
                            {quantity > 0 && <span className="cart-indicator">{quantity}</span>}&rarr;
                        </a>
                    )}
                </div>
            </header>
            <section className="cart-section cart-content mb-auto">
                <div className="pod">
                    {checkout.lineItems.length > 0 ? (
                        <ul className="cart-list list-reset">{loopLineItems}</ul>
                    ) : (
                        <p className="empty">You have no items in your cart.</p>
                    )}
                </div>
            </section>
            {checkout.lineItems.length > 0 && (
                <Fragment>
                    <section className="cart-section">
                        <div className="pod">
                            <div className="cart-summary row">
                                <div className="col">
                                    <p className="cart-detail cart-subtotal">Subtotal</p>
                                </div>
                                <div className="col">
                                    <p className="cart-detail text-right">${addCommasToNumber(checkout.subtotalPrice)}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="cart-footer">
                        <div className="pod">
                            <a className="btn btn-main btn-lg btn-block btn-pill to-checkout" href={checkout.webUrl}>
                                Go To Checkout &rarr;
                            </a>
                        </div>
                    </footer>
                </Fragment>
            )}
        </div>
    );
};

export default Cart;
