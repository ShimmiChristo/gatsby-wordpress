// const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

// /**
//  * Returns the current date in YYYY-MM-DD format
//  */
// function getCurrentDate() {
//   const d = new Date()
//   let month = (d.getMonth() + 1).toString()
//   if (month.length < 2) {
//     month = `0${month}`
//   }
//   let day = d.getDate().toString()
//   if (day.length < 2) {
//     day = `0${day}`
//   }
//   return `${d.getFullYear()}-${month}-${day}`
// }

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Define a template for blog post
//   const blogPost = path.resolve(`./src/templates/blog-post.js`)

//   // Get all markdown blog posts sorted by date
//   const result = await graphql(
//     `
//       query GetPublishedBlogPosts {
//         allMdx(filter: {frontmatter: {published: {eq: true}}}) {
//           edges {
//             node {
//               id
//               slug
//             }
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       result.errors
//     )
//     return
//   }

//   const posts = result.data.allMdx.edges

//   // Create blog posts pages
//   // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
//   // `context` is available in the template as a prop and as a variable in GraphQL

//   if (posts.length > 0) {
//     posts.forEach((post, index) => {
//       const previousPostId = index === 0 ? null : posts[index - 1].node.id
//       const nextPostId = index === posts.length - 1 ? null : posts[index + 1].node.id

//       createPage({
//         path: post.node.slug,
//         component: blogPost,
//         context: {
//           id: post.node.id,
//           previousPostId,
//           nextPostId,
//         },
//       })
//     })
//   }
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `Mdx` && node.frontmatter.category === `blog`) {
//     const value = `/blog${createFilePath({
//       node,
//       getNode,
//       basePath: `blog/`,
//       trailingSlash: false,
//     })}`

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// // foreign-key relationship for featured image
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type Mdx implements Node {
//       frontmatter: MdxFrontmatter!
//       fields: Fields
//     }
//     type MdxFrontmatter {
//       title: String
//       description: String
//       published: Boolean
//       featuredImg: File @fileByRelativePath
//     }
//     type Frontmatter {
//       title: String
//       description: String
//       published: Boolean
//       featuredImg: File @fileByRelativePath
//     }

//     type Fields {
//       slug: String
//     }
//   `)
// }
