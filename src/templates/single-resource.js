import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';

export default ({ location, data }) => {
    const { resource } = data;
    return (
        <Layout
            template={`single single-resource single-resource-${resource.slug}`}
            title={resource.title}
            description={logicDescription(resource)}
            location={location}
        >
            <Basic id={resource.slug} space="space-custom">
                <header className="node-xs-30 node-lg-50">
                    <h1>{resource.title}</h1>
                </header>
                <section className="node-xs-30 node-lg-50" dangerouslySetInnerHTML={{ __html: resource.body.childMarkdownRemark.html }} />
            </Basic>
        </Layout>
    );
};

export const query = graphql`
    query resourceBySlug($slug: String!) {
        resource: contentfulResource(slug: { eq: $slug }) {
            title
            slug
            body {
                childMarkdownRemark {
                    html
                    excerpt
                }
            }
            excerpt {
                excerpt
            }
        }
    }
`;
