const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    // Post
    const posts = await graphql(`
        query {
            entries: allContentfulPost(sort: { fields: published, order: DESC }, limit: 1000) {
                edges {
                    node {
                        title
                        slug
                        type
                    }
                }
            }
            types: allContentfulPost {
                group(field: type) {
                    fieldValue
                    totalCount
                }
            }
        }
    `);
    const postArchive = 'post';
    const postDirectory = postArchive;
    const postEntries = posts.data.entries.edges;
    const postTypes = posts.data.types.group;
    const postTotal = postEntries.length;
    const postPerPage = 1;
    const postNumPages = Math.ceil(postTotal / postPerPage);

    // Post - Single
    postEntries.forEach(({ node }, index) => {
        const { slug } = node;
        const previous = index === postTotal - 1 ? null : postEntries[index + 1].node;
        const next = index === 0 ? null : postEntries[index - 1].node;

        createPage({
            path: `/${postDirectory}/${slug}`,
            component: path.resolve('./src/templates/single-post.js'),
            context: {
                archive: postArchive,
                directory: postDirectory,
                total: postTotal,
                slug,
                previous,
                next,
            },
        });
    });

    // Post - Archive
    Array.from({ length: postNumPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/${postDirectory}` : `/${postDirectory}/${i + 1}`,
            component: path.resolve('./src/templates/archive-post.js'),
            context: {
                archive: postArchive,
                directory: postDirectory,
                total: postTotal,
                limit: postPerPage,
                skip: i * postPerPage,
                currentPage: i + 1,
                numPages: postNumPages,
                type: 'all',
            },
        });
    });

    // Post - Archive - Type
    postTypes.forEach((item) => {
        const { fieldValue, totalCount } = item;
        const slug = _.kebabCase(fieldValue);
        const directory = `${postDirectory}/${slug}`;
        const numPages = Math.ceil(totalCount / postPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/${directory}` : `/${directory}/${i + 1}`,
                component: path.resolve('./src/templates/archive-post.js'),
                context: {
                    archive: postArchive,
                    total: totalCount,
                    limit: postPerPage,
                    skip: i * postPerPage,
                    currentPage: i + 1,
                    type: fieldValue,
                    slug,
                    directory,
                    numPages,
                },
            });
        });
    });

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
};
