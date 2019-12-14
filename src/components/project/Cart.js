import React, { Fragment, useContext } from 'react';
import { ShopContext } from '../../contexts/shop';
import Billboard from './Billboard';
import CartItem from './CartItem';
import Coupon from './Coupon';

const Cart = () => {
    const { checkout, onCartClose } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => <CartItem key={item.id} item={item} />);
    return (
        <div id="cart" className="cart">
            <header className="cart-header node-xs-50 d-flex align-items-center justify-content-between">
                <h3>Cart</h3>
                {checkout.lineItems.length > 0 && (
                    <a className="btn btn-default btn-md btn-initial to-checkout" href={checkout.webUrl}>
                        Check out now &rarr;
                    </a>
                )}
            </header>
            {checkout.lineItems.length > 0 ? (
                <Fragment>
                    <section className="cart-section node-xs-50">
                        <ul className="cart-list list-reset">{loopLineItems}</ul>
                    </section>
                    <section className="cart-section node-xs-50">
                        <div className="row">
                            <div className="col">
                                <Coupon />
                            </div>
                            <div className="col">
                                <div className="cart-summary">
                                    <p className="cart-detail">
                                        Subtotal: <span className="cart-subtotal-price">${checkout.subtotalPrice}</span>
                                    </p>
                                    <p className="cart-disclaimer">Taxes and shipping calculated at checkout.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            ) : (
                <section className="cart-section node-xs-50">
                    <p>You have no items in your cart.</p>
                </section>
            )}
            <section className="cart-section node-xs-50">
                <Billboard />
            </section>
            <footer className="cart-footer node-xs-50 d-flex justify-content-between">
                <button type="button" className="btn btn-text btn-lg to-previous" onClick={onCartClose}>
                    &larr; Continue shopping
                </button>
                {checkout.lineItems.length > 0 && (
                    <a className="btn btn-default btn-lg btn-initial to-checkout" href={checkout.webUrl}>
                        Go to checkout &rarr;
                    </a>
                )}
            </footer>
        </div>
    );
};

export default Cart;
