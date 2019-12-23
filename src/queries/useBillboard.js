import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const { shopifyProduct } = useStaticQuery(
        graphql`
            query {
                shopifyProduct(tags: { eq: "billboard" }) {
                    id
                    handle
                    title
                    images {
                        ...imageShopify
                    }
                    variants {
                        shopifyId
                        price
                    }
                }
            }
        `,
    );
    return shopifyProduct;
};
