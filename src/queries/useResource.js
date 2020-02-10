import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const { allContentfulResource } = useStaticQuery(
        graphql`
            query {
                allContentfulResource {
                    edges {
                        node {
                            title
                            slug
                        }
                    }
                }
            }
        `,
    );
    return allContentfulResource;
};
