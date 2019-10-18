import React from 'react';
import { graphql } from 'gatsby';
import { logicDescription } from '../logic';
import * as path from '../path';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Card from '../components/unit/Card';

export default ({ location, data }) => {
    const { posts, page } = data;
    const loopPost = posts.edges.map(({ node }) => <Card key={node.id} node={node} column="col-lg-6" item="post" directory={path.POST} />);
    return (
        <Layout template={`page page-${page.slug}`} title={page.title} description={logicDescription(page)} location={location}>
            {page && posts.edges.length > 0 && (
                <Feed id={`feed-${page.slug}`} space="space-custom" item="post">
                    {page.head && (
                        <header
                            className="copy node-xs-50 node-lg-80 text-lg-center"
                            dangerouslySetInnerHTML={{ __html: page.head.childMarkdownRemark.html }}
                        />
                    )}
                    <section className="node-xs-50 node-lg-80 cheat-both">
                        <div className="row gutter-20">{loopPost}</div>
                    </section>
                </Feed>
            )}
        </Layout>
    );
};

export const query = graphql`
    query pageOverview {
        posts: allContentfulPost(sort: { fields: published, order: DESC }) {
            edges {
                node {
                    id
                    title
                    slug
                    image {
                        ...imageFeed
                    }
                    body {
                        childMarkdownRemark {
                            excerpt
                        }
                    }
                    excerpt {
                        excerpt
                    }
                    published(formatString: "MMMM D, YYYY")
                }
            }
        }
        page: contentfulPage(slug: { eq: "overview" }) {
            ...contentPage
        }
    }
`;
