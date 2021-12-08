import React from 'react';
// import Image from 'gatsby-image'; // !deprecated

import { GetLatestPosts } from '../hooks/get-latest-posts';
// import styled from "styled-components"

function LatestPosts() {
  const { edges } = GetLatestPosts();

  console.log(edges);
  return (
    <section>
      <ul>
        {edges.map((item) => {
          const title = item.node.title;
          const keyId = item.node.id;
          const featuredImgSrc =  item.node.featuredImage ? item.node.featuredImage.node.sourceUrl : '';
          return (
            <li key={keyId}>
              <h2>{title}</h2>

              <img src={featuredImgSrc} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LatestPosts;
