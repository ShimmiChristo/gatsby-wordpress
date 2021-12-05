import React from "react"
import styled from "styled-components"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { usePublishedPosts } from "../hooks/use-published-posts"

import AuthorBio from "../components/author-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPostThumbnailImg from "../components/blog-post-thumbnail-img"

const BlogIndex = ({ data, location }) => {
  const { title, description, headline } = useSiteMetadata()
  const { nodes } = usePublishedPosts()
  const siteTitle = title || `Title`
  const posts = nodes

  const OlContainer = styled.ol`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <AuthorBio />
        <p>No blog yet, but stay tuned!</p>
      </Layout>
    )
  } else {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <OlContainer style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <BlogPostThumbnailImg
                key={post.id}
                slug={post.slug}
                title={title}
                featuredImg={post.frontmatter.featuredImg}
                date={post.frontmatter.date}
                description={post.frontmatter.description}
                excerpt={post.excerpt}
              />
            )
          })}
        </OlContainer>
        <AuthorBio />
      </Layout>
    )
  }
}

export default BlogIndex
