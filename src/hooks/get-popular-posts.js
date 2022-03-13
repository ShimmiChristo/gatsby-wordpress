import { useStaticQuery, graphql } from 'gatsby';

export const GetPopularPosts = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMostViewedPages(
          filter: { uri: { regex: "/^(?!(/|(/category/).*)$).*$/" } }
          sort: { fields: count, order: DESC }
          limit: 6
        ) {
          edges {
            node {
              id
              uri
            }
          }
        }
        allWpPost {
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
