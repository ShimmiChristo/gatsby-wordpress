import { useStaticQuery, graphql } from "gatsby"

export const useProfilePic = () => {
  const { file } = useStaticQuery(graphql`
    query ProfilePic {
      file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 75, height: 75, quality: 95) {
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return file.childImageSharp
}
