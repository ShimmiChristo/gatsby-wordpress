import { useStaticQuery, graphql } from 'gatsby';

export const GetFeaturedPosts = () => {
  const { allWpPost } = useStaticQuery(
    graphql`
      query {
        allWpPost(
          limit: 2
          filter: {
            categories: { nodes: { elemMatch: { name: { eq: "Featured" } } } }
          }
        ) {
          edges {
            node {
              id
              title
              uri
              categories {
                nodes {
                  id
                  name
                  link
                }
              }
              date(formatString: "MMM D, YYYY")
              featuredImage {
                node {
                  altText
                  uri
                  sourceUrl
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  return allWpPost;
};
