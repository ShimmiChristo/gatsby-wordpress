import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import AuthorBio from '../components/author-bio-v2';
import Layout from '../components/layout';
import Seo from '../components/seo';
import SidebarLatestPosts from '../components/sidebar--latest-posts';
import SidebarGetCategories from '../components/sidebar--categories';
import SidebarGetTags from '../components/sidebar--tags';
// import BlogPostComments from '../components/comments-section';
import BlogPostCommentsFB from '../components/comments-section--facebook';

// import { v1 as uuidv1 } from 'uuid';
// const uuid = uuidv1();

const BlogPostSidebarTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  };
  const categoriesArr = post.categories ? post.categories.nodes : [];
  const authorName = post.author.node.name;
  const authorDescription = post.author.node.description;
  const authorAvatarUrl = post.author.node.avatar.url;

  return (
    <Layout addClasses={'row my-5'}>
      <Seo title={post.title} description={post.excerpt} />
      <div className="col-md-9">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="border-bottom mb-4 pb-2">
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.data && (
              <GatsbyImage image={featuredImage.data} alt={featuredImage.alt} className="mb-2" />
            )}
            <h1 itemProp="headline">{parse(post.title)}</h1>
            <div className="d-flex flex-wrap justify-content-start fs-small">
              <span>{post.date}</span>
              <span className="px-2"> / </span>
              <div className="post__categories">
                {categoriesArr.map((cat) => (
                  <Link key={cat.id} to={cat.link}>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </header>

          {!!post.content && (
            <section itemProp="articleBody">{parse(post.content)}</section>
          )}


          <footer>
            <AuthorBio
              authorName={authorName}
              authorDescription={authorDescription}
              authorAvatarUrl={authorAvatarUrl}
            />
            <BlogPostCommentsFB uri={post.uri} />
          </footer>
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.uri} rel="prev">
                  ← {parse(previous.title)}
                </Link>
              )}
            </li>

            <li>
              {next && (
                <Link to={next.uri} rel="next">
                  {parse(next.title)} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-md-3 mt-4 mt-md-0">
        <aside>
          <SidebarLatestPosts />
          <SidebarGetCategories />
          <SidebarGetTags />
        </aside>
      </div>
    </Layout>
  );
};

export default BlogPostSidebarTemplate;

export const pageQuery = graphql`
  query BlogPostSidebarById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      author {
        node {
          name
          description
          avatar {
            url
          }
        }
      }
      excerpt
      content
      title
      uri
      categories {
        nodes {
          id
          name
          link
        }
      }
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
                aspectRatio: 1.77
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
