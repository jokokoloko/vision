import React, { createContext, useState, useEffect } from 'react';

const defaultValues = {
    isLoading: false,
    isShroudOpen: false,
    isCartOpen: false,
    setLoading: undefined,
    setShroudOpen: undefined,
    setCartOpen: undefined,
};

export const InterfaceContext = createContext(defaultValues);

export const InterfaceProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [isShroudOpen, setShroudOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    useEffect(() => {
        (isLoading || isCartOpen) && setShroudOpen(true);
        return () => setShroudOpen(false);
    }, [isLoading, isCartOpen]);
    return (
        <InterfaceContext.Provider
            value={{
                ...defaultValues,
                isLoading,
                isShroudOpen,
                isCartOpen,
                setLoading,
                setShroudOpen,
                setCartOpen,
            }}
        >
            {children}
        </InterfaceContext.Provider>
    );
};
