import React from 'react';
import { InterfaceProvider } from './src/contexts/interface';
import { ShopProvider } from './src/contexts/shop';

export const wrapRootElement = ({ element }) => (
    <InterfaceProvider>
        <ShopProvider>{element}</ShopProvider>
    </InterfaceProvider>
);
