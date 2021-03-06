import { useStaticQuery, graphql } from 'gatsby';

export const GetLatestPosts = () => {
  const { allWpPost } = useStaticQuery(
    graphql`
      query {
        allWpPost(limit: 4) {
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
                  id
                  uri
                  altText
                  sourceUrl
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 600)
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
