import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: process.env.SHOPIFY_SHOP_NAME + '.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const defaultValues = {
    isCartOpen: false,
    quantity: 0,
    checkout: {
        lineItems: [],
    },
    toggleCartOpen: () => {},
    onCartClose: () => {},
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    checkCoupon: () => {},
    client,
};

const isBrowser = typeof window !== 'undefined';

export const ShopContext = createContext(defaultValues);

export const ShopProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const toggleCartOpen = () => setCartOpen(!isCartOpen);
    const onCartClose = () => setCartOpen(false);
    const [checkout, setCheckout] = useState(defaultValues.checkout);
    const createNewCheckout = async () => {
        try {
            const newCheckout = await client.checkout.create();
            if (isBrowser) {
                localStorage.setItem('checkout_id', newCheckout.id);
            }
            return newCheckout;
        } catch (e) {
            console.error(e);
        }
    };
    const initializeCheckout = async () => {
        try {
            const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;
            let newCheckout = null;
            if (currentCheckoutId) {
                newCheckout = await client.checkout.fetch(currentCheckoutId);
                if (newCheckout.completedAt) {
                    newCheckout = await createNewCheckout();
                }
            } else {
                newCheckout = await createNewCheckout();
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
        } catch (e) {
            console.error(e);
        }
    };
    const removeProductFromCart = async (lineItemId) => {
        try {
            const newCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }
    };
    const quantity = checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
    useEffect(() => {
        initializeCheckout();
    }, []);
    return (
        <ShopContext.Provider
            value={{
                ...defaultValues,
                isCartOpen,
                quantity,
                checkout,
                toggleCartOpen,
                onCartClose,
                addProductToCart,
                removeProductFromCart,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
