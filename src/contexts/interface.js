import React, { createContext, useState, useEffect } from 'react';
import { Events } from 'react-scroll';

const defaultValues = {
    classOffCanvasPush: undefined,
    isLoading: false,
    isScrollShowing: false,
    isOffCanvasOpen: false,
    isCartOpen: false,
    setLoading: () => {},
    setScrollShowing: () => {},
    setOffCanvasOpen: () => {},
    setCartOpen: () => {},
    onOffCanvasOpen: () => {},
    onOffCanvasClose: () => {},
    onCartOpen: () => {},
    onCartClose: () => {},
};

export const InterfaceContext = createContext(defaultValues);

export const InterfaceProvider = ({ children }) => {
    // Loading
    const [isLoading, setLoading] = useState(false);

    // Scroll
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

    // OffCanvas
    const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);
    const classOffCanvasPush = isOffCanvasOpen ? 'offcanvas-push offcanvas-push-out' : 'offcanvas-push';
    const onOffCanvasOpen = () => setOffCanvasOpen(true);
    const onOffCanvasClose = () => setOffCanvasOpen(false);
    useEffect(() => {
        isOffCanvasOpen && Events.scrollEvent.register('end', onOffCanvasClose);
        return () => Events.scrollEvent.remove('end');
    }, [isOffCanvasOpen]);

    // Cart
    const [isCartOpen, setCartOpen] = useState(false);
    const onCartOpen = () => setCartOpen(true);
    const onCartClose = () => setCartOpen(false);
    return (
        <InterfaceContext.Provider
            value={{
                ...defaultValues,
                classOffCanvasPush,
                isLoading,
                isScrollShowing,
                isOffCanvasOpen,
                isCartOpen,
                setLoading,
                setScrollShowing,
                setOffCanvasOpen,
                setCartOpen,
                onOffCanvasOpen,
                onOffCanvasClose,
                onCartOpen,
                onCartClose,
            }}
        >
            {children}
        </InterfaceContext.Provider>
    );
};
