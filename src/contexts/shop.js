import React, { createContext } from 'react';
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
    const addProductToCart = async (variantId) => {
        try {
            const newCheckout = await client.checkout.create();
            const lineItems = [
                {
                    quantity: 1,
                    variantId,
                },
            ];
            const addItems = await client.checkout.addLineItems(newCheckout.id, lineItems);
            console.log(addItems);
        } catch (e) {
            console.error(e);
        }
    };
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
