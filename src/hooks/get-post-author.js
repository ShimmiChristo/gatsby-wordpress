import { useStaticQuery, graphql } from 'gatsby';

export const GetPostAuthors = () => {
  const { allAuthorsJson } = useStaticQuery(
    graphql`
      query {
        allAuthorsJson {
          nodes {
            id
            name
            twitter
            instagram
            facebook
          }
        }
      }
    `
  );
  return allAuthorsJson;
};
