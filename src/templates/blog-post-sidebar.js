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
    <Layout addClasses={'row'}>
      <Seo title={post.title} description={post.excerpt} />
      <div className="col-10">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.data && (
              <GatsbyImage
                image={featuredImage.data}
                alt={featuredImage.alt}
                style={{ marginBottom: 50 }}
              />
            )}
            <h1 itemProp="headline">{parse(post.title)}</h1>
            <p>{post.date}</p>
            <div className="post__categories">
              {categoriesArr.map((cat) => (
                <Link key={cat.id} to={cat.link}>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </header>

          {!!post.content && (
            <section itemProp="articleBody">{parse(post.content)}</section>
          )}

          <hr />

          <footer>
            <AuthorBio
              authorName={authorName}
              authorDescription={authorDescription}
              authorAvatarUrl={authorAvatarUrl}
            />
            <BlogPostCommentsFB uri={post.uri}/>
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
                  ??? {parse(previous.title)}
                </Link>
              )}
            </li>

            <li>
              {next && (
                <Link to={next.uri} rel="next">
                  {parse(next.title)} ???
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-2">
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
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
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
