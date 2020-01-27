import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const { allContentfulFooter } = useStaticQuery(
        graphql`
            query {
                allContentfulFooter(sort: { fields: order, order: ASC }) {
                    edges {
                        node {
                            id
                            title
                            slug
                            body {
                                childMarkdownRemark {
                                    html
                                }
                            }
                            social
                            column
                            order
                        }
                    }
                }
            }
        `,
    );
    return allContentfulFooter;
};
