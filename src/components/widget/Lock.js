import { useEffect } from 'react';

const Lock = () => {
    const classScrollLock = 'scroll-lock';
    useEffect(() => {
        document.body.classList.add(classScrollLock);
        return () => document.body.classList.remove(classScrollLock);
    }, []);
    return null;
};

export default Lock;
