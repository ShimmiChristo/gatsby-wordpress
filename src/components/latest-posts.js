import React from 'react';
import { Link } from 'gatsby';
// import Image from 'gatsby-image'; // !deprecated
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { GetLatestPosts } from '../hooks/get-latest-posts';
// import styled from "styled-components"

function LatestPosts() {
  const { edges } = GetLatestPosts();

  return (
    <section>
      <div className="row py-3">
        <h2 className="page__title latest-posts col-6 h4 m-0">Latest Posts</h2>
        <div className="col-6 d-flex text-end justify-content-end align-items-end h4 m-0">
          <Link to="/category/news">view more</Link>
        </div>
      </div>
      <ul className="row pb-4 p-0">
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
            <li key={keyId} className="post col-md-6 col-lg-3 post d-flex flex-column justify-content-start">
              <div className='image-filler'>
                <Link to={item.node.uri}>
                  <GatsbyImage image={featuredImgSrc} alt={featuredImgAlt} width={100} aspectRatio={4/3} />
                </Link>
              </div>
              <div className="d-flex flex-wrap justify-content-start pt-2 fs-small">
                <span className="post__date">{publishedDate} </span>
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
                  <h3 className="post__title h5">{title}</h3>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LatestPosts;
