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
        label: 'Page',
        to: path.OVERVIEW,
    },
    {
        label: 'Archive',
        to: path.POST,
    },
    {
        label: 'Single',
        to: path.ABOUT,
    },
    {
        label: 'Collection',
        custom: 'collection',
    },
    {
        label: 'Dropdown',
        children: DROPDOWN,
    },
];
