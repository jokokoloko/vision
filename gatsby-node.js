const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    // Simple
    const simples = await graphql(`
        query {
            entries: allContentfulSimple {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
        }
    `);
    const simpleArchive = '/';
    const simpleDirectory = simpleArchive;
    const simpleEntries = simples.data.entries.edges;
    const simpleTotal = simpleEntries.length;

    // Simple - Single
    simpleEntries.forEach(({ node }, index) => {
        const { slug } = node;
        const previous = index === simpleTotal - 1 ? null : simpleEntries[index + 1].node;
        const next = index === 0 ? null : simpleEntries[index - 1].node;

        createPage({
            path: `/${slug}`,
            component: path.resolve('./src/templates/single-simple.js'),
            context: {
                archive: simpleArchive,
                directory: simpleDirectory,
                total: simpleTotal,
                slug,
                previous,
                next,
            },
        });
    });

    // Resource
    const resources = await graphql(`
        query {
            entries: allContentfulResource {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
        }
    `);
    const resourceArchive = 'resource';
    const resourceDirectory = resourceArchive;
    const resourceEntries = resources.data.entries.edges;
    const resourceTotal = resourceEntries.length;

    // Resource - Single
    resourceEntries.forEach(({ node }, index) => {
        const { slug } = node;
        const previous = index === resourceTotal - 1 ? null : resourceEntries[index + 1].node;
        const next = index === 0 ? null : resourceEntries[index - 1].node;

        createPage({
            path: `/${resourceDirectory}/${slug}`,
            component: path.resolve('./src/templates/single-resource.js'),
            context: {
                archive: resourceArchive,
                directory: resourceDirectory,
                total: resourceTotal,
                slug,
                previous,
                next,
            },
        });
    });

    // Product
    const products = await graphql(`
        query {
            entries: allShopifyProduct {
                edges {
                    node {
                        id
                        handle
                    }
                }
            }
        }
    `);
    const productArchive = 'product';
    const productDirectory = productArchive;
    const productEntries = products.data.entries.edges;
    const productTotal = productEntries.length;
    const productPerPage = 1;
    const productNumPages = Math.ceil(productTotal / productPerPage);

    // Product - Single
    productEntries.forEach(({ node }, index) => {
        const { id, handle } = node;
        const previous = index === productTotal - 1 ? null : productEntries[index + 1].node;
        const next = index === 0 ? null : productEntries[index - 1].node;

        createPage({
            path: `/${productDirectory}/${handle}`,
            component: path.resolve('./src/templates/single-product.js'),
            context: {
                archive: productArchive,
                directory: productDirectory,
                total: productTotal,
                id,
                handle,
                previous,
                next,
            },
        });
    });

    // Collection
    const collections = await graphql(`
        query {
            entries: allShopifyCollection {
                edges {
                    node {
                        id
                        handle
                    }
                }
            }
        }
    `);
    const collectionArchive = 'product';
    const collectionDirectory = collectionArchive;
    const collectionEntries = collections.data.entries.edges;
    const collectionTotal = collectionEntries.length;
    const collectionPerPage = 1;
    const collectionNumPages = Math.ceil(collectionTotal / collectionPerPage);

    // Collection - Single
    collectionEntries.forEach(({ node }, index) => {
        const { id, handle } = node;
        const previous = index === collectionTotal - 1 ? null : collectionEntries[index + 1].node;
        const next = index === 0 ? null : collectionEntries[index - 1].node;

        createPage({
            path: `/${collectionDirectory}/${handle}`,
            component: path.resolve('./src/templates/single-collection.js'),
            context: {
                archive: collectionArchive,
                directory: collectionDirectory,
                total: collectionTotal,
                id,
                handle,
                previous,
                next,
            },
        });
    });
};
