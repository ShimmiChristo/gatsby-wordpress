import { useStaticQuery, graphql } from 'gatsby';

export const GetTagsList = () => {
  const { allWpTag } = useStaticQuery(
    graphql`
      query {
        allWpTag {
          edges {
            node {
              id
              uri
              name
            }
          }
        }
      }
    `
  );
  return allWpTag;
};
