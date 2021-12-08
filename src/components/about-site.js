import React from "react"
import { UseSiteMetadata } from "../hooks/use-site-metadata"
import styled from "styled-components"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

const Container = styled.div`
  padding: 0 0 2rem 0;
  border-color: var(--color-brand-med);
  & h2 {
    flex: 0 0 100%;
    border-bottom: 4px solid var(--color-brand-light);
    position: relative;
  }
  & h2::after {
    border-bottom: 4px solid var(--color-brand-dark);
    content: " ";
    width: 70%;
    position: absolute;
    bottom: -6px;
    display: block;
    transform: rotate(-0.5deg);
  }
  @media (max-width: 767px) {

  }
`
const Headline = styled.div``
const Info = styled.div``

function AboutSite() {
  const { author, title, description, headline } = UseSiteMetadata()

  return (
    <section>
      <Container>
        <h2>About {title}</h2>
        <Headline>
          <p>{headline}</p>
        </Headline>
        <Info>
          <p>{description}</p>
        </Info>
      </Container>
    </section>
  )
}

export default AboutSite
