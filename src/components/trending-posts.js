import React from 'react';
import { Link } from 'gatsby';
// import { GetLatestPosts } from '../hooks/get-latest-posts';
import { GetTrendingPosts } from '../hooks/get-trending-posts';
// import styled from "styled-components"

function TrendingPosts() {
  const { allTrendingPages, allWpPost } = GetTrendingPosts();
  const result = allWpPost.edges.filter((node1) =>
    allTrendingPages.edges.some((node2) => node1.node.uri === node2.node.uri)
  );

  return (
    <section>
      <div className="row">
        <h2 className="page__title trending-posts">Trending</h2>
      </div>
      <ul className="row mb-3">
        {result.map((item, index) => {
          const title = item.node.title;
          const keyId = item.node.id;
          const publishedDate = item.node.date;
          const categoriesArr = item.node.categories
            ? item.node.categories.nodes
            : [];
          if (index < 4) {
            return (
              <li key={keyId} className="post">
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
