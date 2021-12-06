import React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../hooks/use-site-metadata';
// import PropTypes from "prop-types"
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--color-brand-gray-6);
  margin-top: 2rem;

  li {
    list-style: none;
    padding-bottom: 0.25rem;
  }
`;


function Footer() {
  const { nav, social, author } = useSiteMetadata();

  return (
    <FooterContainer className="">
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-3 text-center">
            <h4 className="footer__title">Links</h4>
            {nav.map((column) => (
              <li className="footer__item">
                <Link to={column.link}>{column.name}</Link>
              </li>
            ))}
          </div>
          <div className="col-md-6 my-3 text-center">
            <h4 className="footer__title">Follow</h4>
            <li className="footer__item">
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                Twitter
              </a>
            </li>
            <li className="footer__item">
              <a href={`https://instagram.com/${social?.instagram || ``}`}>
                Instagram
              </a>
            </li>
            <li className="footer__item">
              <a href={`https://youtube.com/${social?.youtube || ``}`}>
                {' '}
                Youtube
              </a>
            </li>
            <li className="footer__item">
              <a href={`https://github.com/${social?.github || ``}`}> Github</a>
            </li>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            © {new Date().getFullYear()}
            {` `}
            {` Created by `}
            <Link to={author.website}>{author.name}</Link>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
