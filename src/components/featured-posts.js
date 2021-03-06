import React from 'react';
import { Link } from 'gatsby';
// import Image from 'gatsby-image'; // !deprecated
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { GetFeaturedPosts } from '../hooks/get-featured-posts';
// import styled from "styled-components"

function FeaturedPosts() {
  const { edges } = GetFeaturedPosts();

  return (
    <section>
      <div className="row">
        <h2 className="page__title featured-posts col-11">Featured Posts</h2>
        <div className="col-1">
          <Link to="/blog">view more</Link>
        </div>
      </div>
      <ul className="row">
        {edges.map((item) => {
          const title = item.node.title;
          const keyId = item.node.id;
          const featuredImgSrc = item.node.featuredImage
            ? getImage(item.node.featuredImage.node.localFile)
            : '';
          const featuredImgAlt = item.node.featuredImage
            ? item.node.featuredImage.node.altText
            : '';
          const publishedDate = item.node.date;
          const categoriesArr = item.node.categories
            ? item.node.categories.nodes
            : [];
          return (
            <li key={keyId} className="post col-md-6">
              <div>
                <Link to={item.node.uri}>
                  <GatsbyImage image={featuredImgSrc} alt={featuredImgAlt} />
                </Link>
              </div>
              <div>
                <span className="post__date">{publishedDate}</span>
                <span> / </span>
                <div className="post__categories">
                  {categoriesArr.map((cat) => (
                    <Link key={cat.id} to={cat.link}>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <Link to={item.node.uri}>
                  <h3 className="post__title">{title}</h3>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FeaturedPosts;
