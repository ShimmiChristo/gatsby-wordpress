import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { GetPopularPosts } from '../hooks/get-popular-posts';
// import styled from "styled-components"

function PopularPosts() {
  const { allMostViewedPages, allWpPost } = GetPopularPosts();
  const result = allWpPost.edges.filter((node1) =>
    allMostViewedPages.edges.some((node2) => node1.node.uri === node2.node.uri)
  );

  return (
    <section>
      <div className="row py-3">
        <h2 className="page__title popular-posts col-8 h5 m-0">Popular Posts</h2>
      </div>
      <ul className="row p-0">
        {result.map((item, index) => {
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

          if (index < 3) {
            return (
              <li key={keyId} className="post col-md-4 d-flex flex-column justify-content-start">
                <div className='image-filler'>
                  <Link to={item.node.uri}>
                    <GatsbyImage image={featuredImgSrc} alt={featuredImgAlt} />
                  </Link>
                </div>
                <div className="d-flex flex-wrap justify-content-start fs-small pt-2">
                  <span className="post__date">{publishedDate}</span>
                  <span className="px-2"> / </span>
                  <div className="post__categories">
                    {categoriesArr.map((cat) => (
                      <Link key={cat.id} to={cat.link}>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-1">
                  <Link to={item.node.uri}>
                    <h3 className="post__title h4">{title}</h3>
                  </Link>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}

export default PopularPosts;
