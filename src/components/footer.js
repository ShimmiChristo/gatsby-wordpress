import React from 'react';
import { Link } from 'gatsby';
import { UseSiteMetadata } from '../hooks/use-site-metadata';
// import PropTypes from "prop-types"
import styled from 'styled-components';
import { v1 as uuidv1 } from 'uuid';

const uuid = uuidv1();


const FooterContainer = styled.footer`
  background-color: var(--color-brand-gray-light);
  margin-top: 2rem;

  li {
    list-style: none;
    padding-bottom: 0.25rem;
  }
`;
const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 767px) {
    padding: 0 2rem;
    margin-bottom: 0;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;

    & h4 {
      flex: 0 0 100%;
    }
  }
`;

function checkForSubNav(navItem,i) {
  if (navItem.link === '#') {
    return navItem.subNavigation.map((subitem,subi) => {
      return (
        <li key={uuid+i+subi} className="px-3">
          <Link to={subitem.link}>{subitem.name}</Link>
        </li>
      );
    });
  } else {
    return (
      <li key={uuid+i} className="px-3">
        <Link to={navItem.link}>{navItem.name}</Link>
      </li>
    );
  }
}

function Footer() {
  const { nav, social, author } = UseSiteMetadata();

  return (
    <FooterContainer className="">
      <div className="container">
        <div className="row">
          <FooterColumn className="col-md-6 my-3">
            <h4>Pages</h4>
            {nav.map((navItem, i) => checkForSubNav(navItem, i))}
          </FooterColumn>
          <FooterColumn className="col-md-6 my-3">
            <h4>Follow</h4>
            <li className="px-3">
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                Twitter
              </a>
            </li>
            <li className="px-3">
              <a href={`https://instagram.com/${social?.instagram || ``}`}>
                Instagram
              </a>
            </li>
            <li className="px-3">
              <a href={`https://youtube.com/${social?.youtube || ``}`}>
                {' '}
                Youtube
              </a>
            </li>
            <li className="px-3">
              <a href={`https://github.com/${social?.github || ``}`}> Github</a>
            </li>
          </FooterColumn>
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
