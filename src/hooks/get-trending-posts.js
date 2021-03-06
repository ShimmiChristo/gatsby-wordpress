import { useStaticQuery, graphql } from 'gatsby';

export const GetTrendingPosts = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allTrendingPages(
          filter: { uri: { regex: "/^(?!(/|(/category/).*)$).*$/" } }
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
