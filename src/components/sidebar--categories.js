import React from 'react';
import { Link } from 'gatsby';
import { GetCategoriesList } from '../hooks/get-categories-list';

function SidebarGetCategories() {
  const { edges } = GetCategoriesList();

  return (
    <section className="border-bottom mb-4 pb-4 ps-2">
      <div>
        <div className="section__title categories-list h5 p-0">Categories</div>
      </div>
      <ul className=" p-0 m-0 d-flex flex-wrap">
        {edges.map((item) => {
          const name = item.node.name;
          const keyId = item.node.id;
          const uri = item.node.uri;
          return (
            <li key={keyId} className="category p-0">
               <div className='post__categories'>
                <Link to={uri}>
                  <span className="category__name">{name}</span>
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
