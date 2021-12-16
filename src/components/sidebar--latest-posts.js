import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { GetLatestPosts } from '../hooks/get-latest-posts';

function SidebarLatestPosts() {
  const { edges } = GetLatestPosts();

  return (
    <section>
      <div className="row">
        <div className="page__title latest-posts">Latest Posts</div>
      </div>
      <ul className="row">
        {edges.map((item) => {
          const title = item.node.title;
          const keyId = item.node.id;
          const featuredImgSrc = item.node.featuredImage
            ? getImage(item.node.featuredImage.node.localFile)
            : '';
          const featuredImgAlt = item.node?.featuredImage
            ? item.node.featuredImage.node.altText
            : '';
          const categoriesArr = item.node.categories
            ? item.node.categories.nodes
            : [];
          return (
            <li key={keyId} className="post">
              <div>
                <Link to={item.node.uri}>
                  <GatsbyImage image={featuredImgSrc} alt={featuredImgAlt} />
                </Link>
              </div>
              <div>
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
                  <div className="post__title">{title}</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SidebarLatestPosts;
