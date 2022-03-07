import React from 'react';
import { Link } from 'gatsby';
// import { GetLatestPosts } from '../hooks/get-latest-posts';
import { GetTrendingPosts } from '../hooks/get-trending-posts';
// import styled from "styled-components"

function TrendingPosts() {
  const { allTrendingPages, allWpPost } = GetTrendingPosts();
  // get the trending posts
  const postsResult = allWpPost.edges.filter((node1) =>
    allTrendingPages.edges.some((node2) => node1.node.uri === node2.node.uri)
  );
  // get the trending category pages
  const catPagesResult = allWpCategory.edges.filter((node1) =>
    allWpCategory.edges.some((node2) => node1.node.uri === node2.node.uri)
  );
  // create function that finds URI in all three arrays
  var allArrays = [
    allTrendingPages.edges,
    allWpPost.edges,
    allWpCategory.edges,
  ];
  var result = allArrays.shift().reduce(function (res, v) {
    if (
      res.indexOf(v) === -1 &&
      allArrays.every(function (a) {
        return a.indexOf(v) !== -1;
      })
    )
      res.push(v);
    return res;
  }, []);

  return (
    <section>
      <div className="row">
        <h2 className="page__title trending-posts">Trending</h2>
      </div>
      <ul className="row mb-3">
        {result.map((item, index) => {
          const title = item.node.title;
          const keyId = item.node.id;
          // const publishedDate = item.node.date;
          const categoriesArr = item.node.categories
            ? item.node.categories.nodes
            : [];

          if (index < 4) {
            return (
              <li key={keyId} className="post">
                <div>
                  {/* <span className="post__date">{publishedDate}</span>
                  <span> / </span> */}
                  <div className="post__categories">
                    {/* {categoriesArr?.map((cat) => (
                      <Link key={cat.id} to={cat.link}>
                        <span>{cat.name}</span>
                      </Link>
                    ))} */}
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
