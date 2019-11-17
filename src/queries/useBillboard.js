import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const { shopifyProduct } = useStaticQuery(
        graphql`
            query {
                shopifyProduct(vendor: { eq: "Billboard" }) {
                    id
                    handle
                    title
                    variants {
                        shopifyId
                        price
                    }
                    images {
                        originalSrc
                    }
                }
            }
        `,
    );
    return shopifyProduct;
};
