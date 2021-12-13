import React from 'react';
import { Link } from 'gatsby';
import { GetCategoriesList } from '../hooks/get-categories-list';

function SidebarGetCategories() {
  const { edges } = GetCategoriesList();

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
            <li key={keyId} className="category">
              <div>
                <Link to={uri}>
                  <div className="category__name">{name}</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SidebarGetCategories;
