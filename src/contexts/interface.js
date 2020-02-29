import React, { createContext, useState, useEffect } from 'react';

const defaultValues = {
    isLoading: false,
    isDropdownOpen: false,
    isCartOpen: false,
    isShroudOpen: false,
    setLoading: () => {},
    setDropdownOpen: () => {},
    setCartOpen: () => {},
    setShroudOpen: () => {},
};

export const InterfaceContext = createContext(defaultValues);

export const InterfaceProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isShroudOpen, setShroudOpen] = useState(false);
    const doShroud = isLoading || isCartOpen;
    useEffect(() => {
        setShroudOpen(doShroud);
        return () => setShroudOpen(false);
    }, [doShroud]);
    const scrollLock = 'scroll-lock';
    const doScrollLock = isLoading || isDropdownOpen || isCartOpen;
    useEffect(() => {
        document.body.classList.toggle(scrollLock, doScrollLock);
        return () => document.body.classList.remove(scrollLock);
    }, [doScrollLock]);
    return (
        <InterfaceContext.Provider
            value={{
                ...defaultValues,
                isLoading,
                isDropdownOpen,
                isCartOpen,
                isShroudOpen,
                setLoading,
                setDropdownOpen,
                setCartOpen,
                setShroudOpen,
            }}
        >
            {children}
        </InterfaceContext.Provider>
    );
};
