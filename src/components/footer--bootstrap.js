import React from 'react';
import { Link } from 'gatsby';
import { UseSiteMetadata } from '../hooks/use-site-metadata';
// import PropTypes from "prop-types"
import styled from 'styled-components';
import { v1 as uuidv1 } from 'uuid';
import { GetCategoriesList } from '../hooks/get-categories-list';

const uuid = uuidv1();

const FooterContainer = styled.footer`
  background-color: var(--color-brand-gray-light);
  margin-top: 2rem;

  li {
    list-style: none;
    padding-bottom: 0.25rem;
  }
`;

function checkForSubNav(navItem, i) {
  if (navItem.link === '#') {
    return navItem.subNavigation.map((subitem, subi) => {
      return (
        <li key={uuid + i + subi}>
          <Link to={subitem.link}>{subitem.name}</Link>
        </li>
      );
    });
  } else {
    return (
      <li key={uuid + i}>
        <Link to={navItem.link}>{navItem.name}</Link>
      </li>
    );
  }
}

function Footer() {
  const { nav, social, author } = UseSiteMetadata();
  const { edges } = GetCategoriesList();

  return (
    <FooterContainer>
      <div className="container-fluid container-xl">
        <div className="row px-4">
          <div className="col-6 col-md-4 my-3 ">
            <h4>Pages</h4>
            {nav.map((navItem, i) => checkForSubNav(navItem, i))}
          </div>
          <div className="col-6 col-md-4 my-3 ">
            <h4>Follow</h4>
            <ul className="p-0">
              <li>
                <a href={`https://twitter.com/${social?.twitter || ``}`}>
                  Twitter
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${social?.instagram || ``}`}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={`https://youtube.com/${social?.youtube || ``}`}>
                  {' '}
                  Youtube
                </a>
              </li>
              <li>
                <a href={`https://github.com/${social?.github || ``}`}>
                  {' '}
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4 my-3 ">
            <h4>Categories</h4>
            <ul className="p-0">
              {edges.map((item) => {
                const name = item.node.name;
                const keyId = item.node.id;
                const uri = item.node.uri;
                return (
                  <li key={keyId}>
                    <div>
                      <Link to={uri}>
                        <span className="category__name">{name}</span>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            © {new Date().getFullYear()}
            {` `}
            {` Created by `}
            <a href={author.website}>{author.name}</a>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
