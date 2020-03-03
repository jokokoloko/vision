import React, { createContext, useState, useEffect } from 'react';
import { Events } from 'react-scroll';

const defaultValues = {
    isLoading: false,
    isScrollShowing: false,
    isDropdownOpen: false,
    isOffCanvasOpen: false,
    isCartOpen: false,
    isShroudOpen: false,
    setLoading: () => {},
    setScrollShowing: () => {},
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
    const offset = 210;
    const [isScrollShowing, setScrollShowing] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            isScrollShowing && scrollTop <= offset && setScrollShowing(false);
            !isScrollShowing && scrollTop >= offset && setScrollShowing(true);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isScrollShowing]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
    const onOffCanvasOpen = () => setOffCanvasOpen(true);
    const onOffCanvasClose = () => {
        setDropdownOpen(false);
        setOffCanvasOpen(false);
    };
    useEffect(() => {
        // TODO: Add check for routing change to run onOffCanvasClose
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
                isScrollShowing,
                isDropdownOpen,
                isOffCanvasOpen,
                isCartOpen,
                isShroudOpen,
                setLoading,
                setScrollShowing,
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
