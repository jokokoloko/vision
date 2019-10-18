const path = require('path');
const _ = require('lodash');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    return graphql(`
        {
            posts: allContentfulPost(sort: { fields: published, order: DESC }, limit: 1000) {
                edges {
                    node {
                        title
                        slug
                        type
                    }
                }
            }
            postTypes: allContentfulPost {
                group(field: type) {
                    fieldValue
                    totalCount
                }
            }
            simples: allContentfulSimple {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
        }
    `).then(({ data, errors }) => {
        if (errors) {
            throw errors;
        }

        // Data
        const { posts, postTypes, simples } = data;

        // Post
        const postArchive = 'post';
        const postDirectory = postArchive;
        const postTotal = posts.edges.length;
        const postPerPage = 1;
        const postNumPages = Math.ceil(postTotal / postPerPage);

        // Post - Single
        posts.edges.forEach(({ node }, index) => {
            const { slug } = node;
            const previous = index === postTotal - 1 ? null : posts.edges[index + 1].node;
            const next = index === 0 ? null : posts.edges[index - 1].node;

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
        postTypes.group.forEach((item) => {
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
        const simpleArchive = '/';
        const simpleDirectory = simpleArchive;
        const simpleTotal = simples.edges.length;

        // Simple - Single
        simples.edges.forEach(({ node }, index) => {
            const { slug } = node;
            const previous = index === simpleTotal - 1 ? null : simples.edges[index + 1].node;
            const next = index === 0 ? null : simples.edges[index - 1].node;

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
    });
};
