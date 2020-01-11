import * as path from './path';

// Dropdown
export const DROPDOWN_COLLECTION = [
    {
        label: 'One',
        to: path.POST,
    },
    {
        label: 'Two',
        to: `${path.POST}/2`,
    },
    {
        label: 'Three',
        to: `${path.POST}/3`,
    },
    {
        label: 'Footer',
        to: 'footer',
        scroll: true,
    },
    {
        label: 'Google',
        to: path.GOOGLE,
        external: true,
    },
];

// Main
export const MAIN = [
    {
        label: 'Our Health Tests',
        children: DROPDOWN_COLLECTION,
    },
    {
        label: 'How It Works',
        to: path.CATALOG,
    },
    {
        label: `Let's Talk Health`,
        to: path.CATALOG,
    },
];

// Account - Log In
export const ACCOUNT_LOG_IN = [
    {
        label: 'Home',
        to: path.ROOT,
    },
    {
        label: 'Down',
        to: 'footer',
        scroll: true,
    },
    {
        label: 'Yahoo',
        to: path.YAHOO,
        external: true,
    },
];
