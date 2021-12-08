import { useStaticQuery, graphql } from "gatsby"

export const UseSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          id
          siteMetadata {
            title
            description
            siteUrl
            headline
            logo
            author {
              name
              website
              email
              phone
            }
            social {
              twitter
              instagram
              youtube
              facebook
              github
            }
            nav {
              name
              link
              subNavigation {
                name
                link
              }
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
