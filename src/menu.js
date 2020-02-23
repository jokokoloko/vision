import * as path from './path';

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
];
