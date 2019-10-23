import React from 'react';
import { ShopProvider } from './src/contexts/shop';

export const wrapRootElement = ({ element }) => <ShopProvider>{element}</ShopProvider>;
