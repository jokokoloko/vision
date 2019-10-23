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

export const ShopContext = createContext(defaultValues);

export const ShopProvider = ({ children }) => {
    const [checkoutId, setCheckoutId] = useState({});
    const initializeCheckout = async () => {
        try {
            const newCheckout = await client.checkout.create();
            setCheckoutId(newCheckout.id);
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
            const addItems = await client.checkout.addLineItems(checkoutId, lineItems);
            console.log(addItems.webUrl);
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
                addProductToCart,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
