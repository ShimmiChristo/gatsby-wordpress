import React from 'react';
import { Link } from 'gatsby';
import { GetTagsList } from '../hooks/get-tags-list';

function SidebarGetTags() {
  // ? An alternative if you return the entire staticQuery
  // const { allWpTag } = GetTagsList();
  // const tagsArray = allWpTag.edges;

  const { edges } = GetTagsList();

  return edges ? (
    <section className='border-bottom mb-4 pb-4 ps-2'>
      <div>
        <div className="section__title categories-list h5 p-0">Tags</div>
      </div>
      <ul className="p-0 m-0 d-flex flex-wrap">
        {edges.map((item) => {
          const name = item.node.name;
          const keyId = item.node.id;
          const uri = item.node.uri;
          return (
            <li key={keyId} className="tag">
              <div className='post__categories'>
                <Link to={uri}>
                  <span className="tag__name">{name}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  ) : (
    ''
  );
}

export default SidebarGetTags;
