import React from "react"
// import { UseSiteMetadata } from "../hooks/use-site-metadata"
// import { useProfilePic } from "../hooks/use-profile-pic"
import styled from "styled-components"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

const Container = styled.div`
  padding: 0 0 1rem;
  border-bottom: 2px solid;
  border-color: var(--color-brand-med);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
  max-width: var(--maxWidth-5xl);
  & h1 {
    margin-bottom: 0;
    font-size: clamp(1rem, 10vw, 2rem);
    text-align: left;
    line-height: 1.5;
  }
  & h2 {
    flex: 0 0 100%;
  }
  @media (max-width: 767px) {
    padding: 0rem 0 0.5rem;
  }
`

function LandingPageHeader({ title }) {
  // const { author } = UseSiteMetadata()
  // const { fluid } = useProfilePic()

  return (
    <section>
      <Container>
        <h1>{title}</h1>
      </Container>
    </section>
  )
}

export default LandingPageHeader
