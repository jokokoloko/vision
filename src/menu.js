import * as path from './path';

// Dropdown
export const DROPDOWN = [
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
        label: 'Single',
        to: path.ABOUT,
    },
    {
        label: 'Archive',
        to: path.POST,
    },
    {
        label: 'Overview',
        to: path.OVERVIEW,
    },
    {
        label: 'Dropdown',
        children: DROPDOWN,
    },
    {
        label: 'Scroll',
        to: 'footer',
        scroll: true,
    },
    {
        label: 'React',
        to: path.REACT,
        external: true,
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
