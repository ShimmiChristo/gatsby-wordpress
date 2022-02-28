import { useStaticQuery, graphql } from 'gatsby';

export const GetTrendingPages = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allTrendingPages(limit: 4) {
          edges {
            node {
              id
              uri
            }
          }
        }
        allWpCategory {
          edges {
            node {
              id
              uri
              name
            }
          }
        }
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
  return data;
};
