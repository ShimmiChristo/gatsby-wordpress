import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.css"
// import "../css/@wordpress/block-library/build-style/theme.css"

// import Bio from "../components/bio"
import Layout from '../components/layout';
import Seo from '../components/seo';

const CategoryPageTemplate = ({ data: { category } }) => {
  const posts = category.posts.nodes;

  return (
    <Layout>
      <Seo title={category.name} description={category.description || ''} />
      <h1 className="text-center text-capitalize display-1 py-2 mb-2 border-bottom col-md-8 mx-auto">
        {category.name}
      </h1>
      {posts.map((post) => {
        const featuredImage = {
          data: post.featuredImage?.node?.localFile?.childImageSharp
            ?.gatsbyImageData,
          alt: post.featuredImage?.node?.alt || ``,
        };
        const postCategories = post.categories.nodes;
        const postAuthor = post.author.node.nickname || post.author.node.name;

        return (
          <div key={post.id}>
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header className="col-md-8 mx-auto">
                {featuredImage.data && (
                  <GatsbyImage
                    image={featuredImage.data}
                    alt={featuredImage.alt}
                  />
                )}
              </header>

              {!!post.excerpt && (
                <section
                  itemProp="articleBody"
                  className="col-md-8 mx-auto mb-5"
                >
                  <div className="d-flex justify-content-start pt-2 fs-small flex-wrap">
                    <span className="post__date">{post.date}</span>
                    <span className="px-2"> / </span>
                    <span>{postAuthor}</span>
                    <span className="px-2"> / </span>
                    <div className="post__categories">
                      {postCategories.map((postCategory) => (
                        <Link key={postCategory.id} to={postCategory.uri}>
                          <span>{postCategory.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1">
                    <Link to={post.uri}>
                      <h2 itemProp="post__title">{parse(post.title)}</h2>
                    </Link>
                  </div>
                  {parse(post.excerpt)}
                </section>
              )}
            </article>
          </div>
        );
      })}
    </Layout>
  );
};

export default CategoryPageTemplate;

export const pageQuery = graphql`
  query CategoryPageById($id: String!) {
    category: wpCategory(id: { eq: $id }) {
      id
      name
      posts {
        nodes {
          id
          excerpt
          content
          uri
          categories {
            nodes {
              id
              name
              uri
            }
          }
          author {
            node {
              nickname
              name
            }
          }
          title
          date(formatString: "MMMM DD, YYYY")
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                    aspectRatio: 2.5
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
