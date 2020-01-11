import React, { Fragment, useContext } from 'react';
import { addCommasToNumber } from '../../function';
import { ShopContext } from '../../contexts/shop';
import Billboard from './Billboard';
import CartItem from './CartItem';

const Cart = () => {
    const { quantity, checkout, onCartClose } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => <CartItem key={item.id} item={item} />);
    return (
        <div id="cart" className="cart">
            <header className="cart-header node-xs-30 d-flex align-items-center justify-content-between">
                <button type="button" className="btn btn-text to-previous" onClick={onCartClose}>
                    &larr;
                </button>
                {checkout.lineItems.length > 0 && (
                    <a className="btn btn-text to-checkout" href={checkout.webUrl}>
                        Cart &rarr;{quantity > 0 && <span className="cart-indicator">{quantity}</span>}
                    </a>
                )}
            </header>
            {checkout.lineItems.length > 0 ? (
                <Fragment>
                    <section className="cart-section node-xs-30">
                        <ul className="cart-list list-reset">{loopLineItems}</ul>
                    </section>
                    <section className="cart-section node-xs-30">
                        <div className="cart-summary row">
                            <div className="col">
                                <p className="cart-detail">Subtotal</p>
                            </div>
                            <div className="col">
                                <p className="cart-detail text-right">${addCommasToNumber(checkout.subtotalPrice)}</p>
                            </div>
                        </div>
                    </section>
                </Fragment>
            ) : (
                <section className="cart-section node-xs-30">
                    <p className="empty">You have no items in your cart.</p>
                </section>
            )}
            <footer className="cart-footer node-xs-30">
                {checkout.lineItems.length > 0 && (
                    <div className="node-xs-30">
                        <a className="btn btn-main btn-lg btn-block btn-pill to-checkout" href={checkout.webUrl}>
                            Go to checkout &rarr;
                        </a>
                    </div>
                )}
                <div className="node-xs-30">
                    <Billboard />
                </div>
            </footer>
        </div>
    );
};

export default Cart;
