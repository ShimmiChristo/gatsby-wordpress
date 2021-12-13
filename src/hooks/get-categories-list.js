import { useStaticQuery, graphql } from 'gatsby';

export const GetCategoriesList = () => {
  const { allWpCategory } = useStaticQuery(
    graphql`
      query {
        allWpCategory {
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
  return allWpCategory;
};
