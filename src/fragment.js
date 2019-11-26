import { graphql } from 'gatsby';

export const imageGeneral = graphql`
    fragment imageGeneral on ContentfulAsset {
        fluid(maxWidth: 800, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageFeature = graphql`
    fragment imageFeature on ContentfulAsset {
        fluid(maxWidth: 340, maxHeight: 210, quality: 100, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageMaximum = graphql`
    fragment imageMaximum on ContentfulAsset {
        fluid(maxWidth: 1680, quality: 100, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageHigh = graphql`
    fragment imageHigh on ContentfulAsset {
        fluid(maxWidth: 1680, quality: 80, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageHero = graphql`
    fragment imageHero on ContentfulAsset {
        fluid(maxWidth: 1680, maxHeight: 550, quality: 80, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageFeed = graphql`
    fragment imageFeed on ContentfulAsset {
        fluid(maxWidth: 550, maxHeight: 340, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageArchive = graphql`
    fragment imageArchive on ContentfulAsset {
        fluid(maxWidth: 890, maxHeight: 445, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageSingle = graphql`
    fragment imageSingle on ContentfulAsset {
        fluid(maxWidth: 1110, maxHeight: 555, quality: 80) {
            ...GatsbyContentfulFluid_withWebp
        }
    }
`;

export const imageClient = graphql`
    fragment imageClient on ContentfulAsset {
        fluid(maxWidth: 130, quality: 100, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp_noBase64
        }
    }
`;

export const imageFigure = graphql`
    fragment imageFigure on ContentfulAsset {
        fluid(maxWidth: 1680, quality: 80, cropFocus: CENTER) {
            ...GatsbyContentfulFluid_withWebp_noBase64
        }
    }
`;

export const imageIcon = graphql`
    fragment imageIcon on ContentfulAsset {
        fixed(width: 130, height: 130, quality: 100, cropFocus: CENTER) {
            ...GatsbyContentfulFixed_withWebp_noBase64
        }
    }
`;

export const imageShopify = graphql`
    fragment imageShopify on ShopifyProductImages {
        localFile {
            childImageSharp {
                fluid(maxWidth: 550, maxHeight: 550, quality: 80) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export const contentGeneral = graphql`
    fragment contentGeneral on ContentfulGeneral {
        id
        title
        slug
        image {
            ...imageHigh
        }
        body {
            childMarkdownRemark {
                html
            }
        }
    }
`;

export const contentPage = graphql`
    fragment contentPage on ContentfulPage {
        title
        slug
        image {
            ...imageHero
        }
        head {
            childMarkdownRemark {
                html
                excerpt
            }
        }
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
`;

export const contentPost = graphql`
    fragment contentPost on ContentfulPost {
        id
        createdAt(formatString: "MMMM D, YYYY")
        title
        slug
        image {
            ...imageArchive
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
        type
    }
`;

export const contentArchive = graphql`
    fragment contentArchive on ContentfulArchive {
        name
        description
    }
`;

export const contentSplash = graphql`
    fragment contentSplash on ContentfulHero {
        id
        title
        slug
        height
        image {
            ...imageHigh
        }
        body {
            childMarkdownRemark {
                html
            }
        }
        action
        scroll
    }
`;

export const contentHero = graphql`
    fragment contentHero on ContentfulHero {
        id
        title
        slug
        height
        image {
            ...imageHero
        }
        body {
            childMarkdownRemark {
                html
            }
        }
        action
        scroll
    }
`;
