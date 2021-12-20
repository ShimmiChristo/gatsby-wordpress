import { useStaticQuery, graphql } from 'gatsby';

export const GetSocialMediaIcons = () => {
  const { file } = useStaticQuery(graphql`
    query {
      facebook: file(absolutePath: {regex: "/facebook-logo.svg/"}) {
        id
        childImageSharp {
          gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FIXED, width: 25)
        }
      }
      twitter: file(absolutePath: {regex: "/twitter-logo.svg/"}) {
        id
        childImageSharp {
          gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FIXED, width: 25)
        }
      }
    }
  `);
  return file.childImageSharp;
};
