import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: process.env.SHOPIFY_SHOP_NAME + '.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const defaultValues = {
    isCartOpen: false,
    cart: [],
    checkout: {
        lineItems: [],
    },
    toggleCartOpen: () => {},
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    checkCoupon: () => {},
    client,
};

const isBrowser = typeof window !== 'undefined';

export const ShopContext = createContext(defaultValues);

export const ShopProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(defaultValues.checkout);
    const initializeCheckout = async () => {
        try {
            const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;
            let newCheckout = null;
            if (currentCheckoutId) {
                newCheckout = await client.checkout.fetch(currentCheckoutId);
            } else {
                newCheckout = await client.checkout.create();
                if (isBrowser) {
                    localStorage.setItem('checkout_id', newCheckout.id);
                }
            }
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }
    };
    const addProductToCart = async (variantId) => {
        try {
            const lineItems = [
                {
                    quantity: 1,
                    variantId,
                },
            ];
            const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);
            setCheckout(newCheckout);
            // window.open(newCheckout.webUrl, '_blank');
            // console.log(newCheckout.webUrl);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        initializeCheckout();
    }, []);
    return (
        <ShopContext.Provider
            value={{
                ...defaultValues,
                checkout,
                addProductToCart,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
