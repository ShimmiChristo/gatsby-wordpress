import React from "react"
import { UseSiteMetadata } from "../hooks/use-site-metadata"
import { useProfilePic } from "../hooks/use-profile-pic"
// import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Image from "gatsby-image"

const Container = styled.div`
  padding: 0 2rem 2rem 2rem;
  border: 2px solid;
  border-color: var(--color-brand-med);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & h2 {
    flex: 0 0 100%;
  }
  @media (max-width: 767px) {
    padding: 0rem 1rem 1rem 1rem;
    justify-content: center;
  }
`
const Bio = styled.div`
  flex: 0 0 70%;
  padding-right: 5%;
  @media (max-width: 767px) {
    padding: 0;
    flex: 0 0 100%;
  }
`
const ProfilePic = styled(Image)`
  flex: 0 0 30%;
  border-radius: 50%;
  @media (max-width: 767px) {
    flex: 0 0 80%;
  }
`

function AboutMe() {
  const { author } = UseSiteMetadata()
  const { fluid } = useProfilePic()

  return (
    <section>
      <Container>
        <Bio>
          <h2>About Me</h2>
          <p>I'm a web developer based in New York City.</p>
          <p>
            I create and improve existing websites with specialization in
            e-commerce. You can read more about me{" "}
            <a href={`${author.website}/about`}>on my website</a>.
          </p>
          <p>
            Email me at <span class="bold">{author.email}</span> or text me at{" "}
            <span class="bold">{author.phone}</span>
          </p>
        </Bio>
        <ProfilePic fluid={fluid} loading="lazy" />
      </Container>
    </section>
  )
}

export default AboutMe

// const Bio = () => {
//   const data = useStaticQuery(graphql`
//     query BioQuery {
//       avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
//         childImageSharp {
//           fixed(width: 50, height: 50, quality: 95) {
//             ...GatsbyImageSharpFixed
//           }
//         }
//       }
//       site {
//         siteMetadata {
//           author {
//             name
//             summary
//           }
//           social {
//             twitter
//           }
//         }
//       }
//     }
//   `)

//   // Set these values by editing "siteMetadata" in gatsby-config.js
//   const author = data.site.siteMetadata?.author
//   const social = data.site.siteMetadata?.social

//   const avatar = data?.avatar?.childImageSharp?.fixed

//   return (
//     <div className="bio">
//       {avatar && (
//         <Image
//           fixed={avatar}
//           alt={author?.name || ``}
//           className="bio-avatar"
//           imgStyle={{
//             borderRadius: `50%`,
//           }}
//         />
//       )}
//       {author?.name && (
//         <p>
//           Written by <strong>{author.name}</strong> {author?.summary || null}
//           {` `}
//           <a href={`https://twitter.com/${social?.twitter || ``}`}>
//             You should follow him on Twitter
//           </a>
//         </p>
//       )}
//     </div>
//   )
// }

// export default Bio
