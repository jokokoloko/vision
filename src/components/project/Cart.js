import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const Cart = () => {
    const { checkout, onCartClose, removeProductFromCart } = useContext(ShopContext);
    const loopLineItems = checkout.lineItems.map((item) => {
        const onClick = () => removeProductFromCart(item.id);
        return (
            <li key={item.id} className="cart-line-item">
                <div className="row align-items-center">
                    <div className="col-2">
                        <img className="img-fluid" src={item.variant.image.src} alt={item.title} />
                    </div>
                    <div className="col">
                        <p className="title">{item.title}</p>
                    </div>
                    <div className="col-2">
                        <p className="price">${item.variant.price}</p>
                    </div>
                    <div className="col-2">
                        <p className="quantity">x{item.quantity}</p>
                    </div>
                    <div className="col-1">
                        <button type="button" className="do-remove" onClick={onClick}>
                            x
                        </button>
                    </div>
                </div>
            </li>
        );
    });
    return (
        <div id="cart" className="cart">
            <header className="cart-header copy node-xs-50">
                <h3>Cart</h3>
            </header>
            <section className="cart-section node-xs-50">
                {checkout.lineItems.length > 0 ? <ul className="cart-list list-reset">{loopLineItems}</ul> : <p>You have no items in your cart.</p>}
                <div className="cart-summary">
                    <p>
                        Subtotal: <span className="cart-subtotal-price">${checkout.subtotalPrice}</span>
                    </p>
                    <p>
                        Taxes: <span className="cart-total-tax">${checkout.totalTax}</span>
                    </p>
                    <p>
                        Total: <span className="cart-total-price">${checkout.totalPrice}</span>
                    </p>
                </div>
            </section>
            <footer className="cart-footer node-xs-50 d-flex justify-content-between">
                <button type="button" className="btn btn-text btn-lg to-previous" onClick={onCartClose}>
                    &larr; Continue shopping
                </button>
                <a className="btn btn-default btn-lg btn-initial to-checkout" href={checkout.webUrl}>
                    Go to checkout &rarr;
                </a>
            </footer>
        </div>
    );
};

export default Cart;
