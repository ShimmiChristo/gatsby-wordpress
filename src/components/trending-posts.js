import React from 'react';
import { Link } from 'gatsby';
import { GetTrendingPages } from '../hooks/get-trending-pages';
// import styled from "styled-components"

function TrendingPosts() {
  const { allTrendingPages, allWpCategory, allWpPost } = GetTrendingPages();

  const allWpCategoryArr = allWpCategory.edges;
  const allWpPostArr = allWpPost.edges;
  const allTrendingPagesArr = allTrendingPages.edges;
  const filteredTrendingArr = [];

  allTrendingPagesArr.filter((object) => {

    const filteredPosts = allWpPostArr.filter((objectPost) => {      
      if (object.node.uri === objectPost.node.uri) {
        filteredTrendingArr.push(objectPost.node);
      }
    });

    const filteredCatPages = allWpCategoryArr.filter((objectPost) => {
      if (object.node.uri === objectPost.node.uri) {
        filteredTrendingArr.push(objectPost.node);
      }
    });
    return filteredPosts, filteredCatPages;
  });


  return (
    <section>
      <div className="row py-3">
        <h2 className="page__title trending-posts h4 m-0">Trending Posts</h2>
      </div>
      <ul className="row mb-3 p-0">
        {filteredTrendingArr.map((item, index) => {
          const title = item?.title;
          const keyId = item?.id;

          if (index < 4) {
            return (
              <li key={keyId} className="post">
                <div className="pt-1">
                  <Link to={item?.uri}>
                    <span className="post__title">{title}</span>
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

export default TrendingPosts;
