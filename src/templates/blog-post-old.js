// import React from "react"
// import { Link, graphql } from "gatsby"
// import { MDXRenderer } from "gatsby-plugin-mdx"
// import styled from "styled-components"
// import Image from "gatsby-image"

// import AuthorBio from "../components/author-bio"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// // import { usePublishedPosts } from "../hooks/use-published-posts"

// const BlogPostTemplate = ({ data, location }) => {
//   const post = data.mdx
//   const siteTitle = data.site.siteMetadata?.title || `Title`
//   const { previous, next } = data
//   // const { nodes } = usePublishedPosts()

//   const FeaturedImg = styled(Image)`
//     display: block;
//     position: absolute;
//     top: 50%;
//     left: 0;
//     transform: translateY(-50%);

//     @media (max-width: 767px) {
//     }
//   `
//   const ImgContainer = styled.div`
//     width: 100%;
//     height: auto;
//     max-height: 250px;
//     overflow: hidden;
//     margin: 1rem 0;
//     @media (max-width: 767px) {
//       width: 100%;
//       height: auto;
//       max-height: 200px;
//     }
//   `
//   const Header = styled.header`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//   `
//   return (
//     <Layout location={location} title={siteTitle}>
//       <SEO
//         title={post.frontmatter.title}
//         description={post.frontmatter.description || post.excerpt}
//       />
//       <article
//         className="blog-post"
//         itemScope
//         itemType="http://schema.org/Article"
//       >
//         <Header>
//           <ImgContainer>
//             <FeaturedImg
//               className="featured-img"
//               fluid={post.frontmatter.featuredImg.childImageSharp.fluid}
//             />
//           </ImgContainer>
//           <h1 itemProp="headline">{post.frontmatter.title}</h1>
//         </Header>
//         <section>
//           <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
//         </section>
//         <hr />
//         <footer>
//           <AuthorBio />
//         </footer>
//       </article>
//       <nav className="blog-post-nav">
//         <ul
//           style={{
//             display: `flex`,
//             flexWrap: `wrap`,
//             justifyContent: `space-between`,
//             listStyle: `none`,
//             padding: 0,
//           }}
//         >
//           <li>
//             {previous && (
//               <Link to={previous.fields.slug} rel="prev">
//                 ← {previous.frontmatter.title}
//               </Link>
//             )}
//           </li>
//           <li>
//             {next && (
//               <Link to={next.fields.slug} rel="next">
//                 {next.frontmatter.title} →
//               </Link>
//             )}
//           </li>
//         </ul>
//       </nav>
//     </Layout>
//   )
// }

// export default BlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug(
//     $id: String!
//     $previousPostId: String
//     $nextPostId: String
//     $currentDate: Date!
//   ) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     mdx(id: { eq: $id }, frontmatter: { date: { lte: $currentDate } }) {
//       id
//       excerpt(pruneLength: 160)
//       body
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         description
//         featuredImg {
//           childImageSharp {
//             fluid(maxWidth: 900) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//     previous: mdx(
//       id: { eq: $previousPostId }
//       frontmatter: { date: { lte: $currentDate } }
//     ) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//     next: mdx(
//       id: { eq: $nextPostId }
//       frontmatter: { date: { lte: $currentDate } }
//     ) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//   }
// `
