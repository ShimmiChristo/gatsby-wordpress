import React from 'react';
import { Link } from 'gatsby';
import { GetTagsList } from '../hooks/get-tags-list'

function SidebarGetTags() {
  // ? An alternative if you return the entire staticQuery
  // const { allWpTag } = GetTagsList();
  // const tagsArray = allWpTag.edges;

  const { edges } = GetTagsList();

  return (
    <section>
      <div className="row">
        <div className="section__title categories-list">Categories</div>
      </div>
      <ul className="row">
        {edges.map((item) => {
          const name = item.node.name;
          const keyId = item.node.id;
          const uri = item.node.uri;
          return (
            <li key={keyId} className="tag">
              <div>
                <Link to={uri}>
                  <div className="tag__name">{name}</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SidebarGetTags;
