import { useStaticQuery, graphql } from 'gatsby';

export default () => {
    const action = useStaticQuery(
        graphql`
            query {
                register: contentfulAction(slug: { eq: "register" }) {
                    label
                    external
                }
                logIn: contentfulAction(slug: { eq: "log-in" }) {
                    label
                    external
                }
            }
        `,
    );
    return action;
};
