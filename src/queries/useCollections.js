import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const { allShopifyCollection } = useStaticQuery(
        graphql`
            query {
                allShopifyCollection {
                    edges {
                        node {
                            title
                            handle
                        }
                    }
                }
            }
        `,
    );
    return allShopifyCollection;
};
