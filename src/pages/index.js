import React from "react"
import { Link, graphql } from "gatsby"

import AboutSite from "../components/about-site"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutMe from "../components/about-me"
import LatestPosts from "../components/latest-posts"
import FeaturedPosts from "../components/featured-posts"

const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const canonicalUrl = data.site.siteMetadata.siteURL + location.pathname

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home Page" />
      <AboutSite />
        <div>
          <ul style={{ listStyle: `none` }}>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
      {/* <AboutMe /> */}
      <LatestPosts />
      <FeaturedPosts />
    </Layout>
  )
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
