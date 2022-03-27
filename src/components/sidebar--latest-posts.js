import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { GetLatestPosts } from '../hooks/get-latest-posts';

function SidebarLatestPosts() {
  const { edges } = GetLatestPosts();

  return (
    <section className="border-bottom mb-4 pb-4">
      <div>
        <div className="page__title latest-posts h5 p-0">Latest Posts</div>
      </div>
      <ul className="p-0 m-0">
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
            <li key={keyId} className="post pb-3">
              <div className='mb-1'>
                <Link to={item.node.uri}>
                  <GatsbyImage
                    image={featuredImgSrc}
                    alt={featuredImgAlt}
                    aspectRatio={16 / 9}
                  />
                </Link>
              </div>
              <div className='mb-1'>
                <Link to={item.node.uri}>
                  <div className="post__title">{title}</div>
                </Link>
              </div>
              <div>
                <div className="post__categories d-flex flex-wrap">
                  {categoriesArr.map((cat) => (
                    <Link key={cat.id} to={cat.link}>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SidebarLatestPosts;
