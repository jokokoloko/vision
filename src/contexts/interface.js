import React, { createContext, useState, useEffect } from 'react';
import { Events } from 'react-scroll';

const defaultValues = {
    isLoading: false,
    isDropdownOpen: false,
    isOffCanvasOpen: false,
    isCartOpen: false,
    isShroudOpen: false,
    setLoading: () => {},
    setDropdownOpen: () => {},
    setOffCanvasOpen: () => {},
    setCartOpen: () => {},
    setShroudOpen: () => {},
    onOffCanvasOpen: () => {},
    onOffCanvasClose: () => {},
};

export const InterfaceContext = createContext(defaultValues);

export const InterfaceProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
    const onOffCanvasOpen = () => setOffCanvasOpen(true);
    const onOffCanvasClose = () => {
        setDropdownOpen(false);
        setOffCanvasOpen(false);
    };
    useEffect(() => {
        isOffCanvasOpen && Events.scrollEvent.register('end', onOffCanvasClose);
        return () => Events.scrollEvent.remove('end');
    }, [isOffCanvasOpen]);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isShroudOpen, setShroudOpen] = useState(false);
    const doShroud = isLoading || isCartOpen;
    useEffect(() => {
        setShroudOpen(doShroud);
        return () => setShroudOpen(false);
    }, [doShroud]);
    const scrollLock = 'scroll-lock';
    const doScrollLock = isLoading || isDropdownOpen || isOffCanvasOpen || isCartOpen;
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
                isOffCanvasOpen,
                isCartOpen,
                isShroudOpen,
                setLoading,
                setDropdownOpen,
                setOffCanvasOpen,
                setCartOpen,
                setShroudOpen,
                onOffCanvasOpen,
                onOffCanvasClose,
            }}
        >
            {children}
        </InterfaceContext.Provider>
    );
};
