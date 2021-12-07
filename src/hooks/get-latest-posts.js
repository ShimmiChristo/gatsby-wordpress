import { useStaticQuery, graphql } from 'gatsby';

export const getLatestPosts = () => {
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
                  name
                  link
                }
              }
              date(formatString: "MMM D, YYYY")
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `
  );
  return allWpPost.edges.node;
};
