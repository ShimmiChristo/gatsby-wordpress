import React from 'react';
import { Link } from 'gatsby';
import { GetLatestPosts } from '../hooks/get-latest-posts';
// import styled from "styled-components"

function TrendingPosts() {
  const { edges } = GetLatestPosts();

  return (
    <section>
      <div className="row">
        <h2 className="page__title trending-posts">Trending</h2>
      </div>
      <ul className="row mb-3">
        {edges.map((item) => {
          const title = item.node.title;
          const keyId = item.node.id;
          const publishedDate = item.node.date;
          const categoriesArr = item.node.categories
            ? item.node.categories.nodes
            : [];
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
        })}
      </ul>
    </section>
  );
}

export default TrendingPosts;
