import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';

const Coupon = () => {
    const { checkout, coupon, onCouponChange, checkCoupon, removeCoupon } = useContext(ShopContext);
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
                    Coupon:
                    <h5 className="title">
                        {checkout.discountApplications[0].code} - {checkout.discountApplications[0].value.percentage}% off
                    </h5>
                    <button onClick={() => removeCoupon(checkout.discountApplications[0].code)} className="is-small button is-danger is-outlined">
                        Remove
                    </button>
                </p>
            ) : (
                <form id="form-coupon" className={`form form-${size}`} onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="coupon" className="label">
                            Coupon
                        </label>
                        <input type="text" id="coupon" className="input" onChange={onChange} value={coupon} />
                    </div>
                    <button className="button">Add Coupon</button>
                </form>
            )}
        </div>
    );
};

export default Coupon;
