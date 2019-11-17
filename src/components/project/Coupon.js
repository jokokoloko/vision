import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const Coupon = () => {
    const { checkout, coupon, onCouponChange, checkCoupon, removeCoupon } = useContext(ShopContext);
    const onClick = () => removeCoupon(checkout.discountApplications[0].code);
    const onChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        onCouponChange(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        checkCoupon(coupon);
    };
    const size = 'lg';
    return (
        <div className="cart-coupon">
            {checkout.discountApplications.length > 0 ? (
                <p>
                    Coupon:{' '}
                    <span className="cart-coupon-code">
                        {checkout.discountApplications[0].code} - {checkout.discountApplications[0].value.percentage}% off
                    </span>
                    <button type="button" className="btn btn-default btn-md do-remove" onClick={onClick}>
                        X
                    </button>
                </p>
            ) : (
                <form id="form-coupon" className={`form form-${size}`} onSubmit={onSubmit}>
                    <div className="input-group input-group-md">
                        <label htmlFor="coupon" className="sr-only">
                            Coupon
                        </label>
                        <input
                            type="text"
                            id="coupon"
                            className="form-control"
                            onChange={onChange}
                            value={coupon}
                            placeholder="Coupon code"
                            aria-label="Coupon code"
                            aria-describedby="do-add-coupon"
                        />
                        <div className="input-group-append">
                            <input type="submit" id="do-add-coupon" className="btn btn-default do-add-coupon" name="do-add-coupon" value="Apply" />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Coupon;
