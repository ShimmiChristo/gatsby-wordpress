import { useStaticQuery, graphql } from "gatsby"
export const usePublishedPosts = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          nodes {
            id
            excerpt
            slug
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              featuredImg {
                childImageSharp {
                  fluid(maxWidth: 900) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  return allMdx
}