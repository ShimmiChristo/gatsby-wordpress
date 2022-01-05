import React, { useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { UseSiteMetadata } from '../hooks/use-site-metadata';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './search';

import {
  faBars,
  faTimes,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const searchIndices = [{ name: `Pages`, title: `Pages` }];

const twitterIcon = '../../content/assets/twitter-logo.svg';
const facebookIcon = '../../content/assets/facebook-logo.svg';
const instagramIcon = '../../content/assets/instagram-logo.svg';
const linkedinIcon = '../../content/assets/linkedin-logo.svg';
const githubIcon = '../../content/assets/github-logo.svg';

const HeaderContainer = styled.header`
  border-bottom: 1px solid #ebebeb;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 2;
  padding: 0 2.5rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }

  ul {
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;

    li {
      margin: 0;
      list-style: none;
      padding-right: 1rem;
    }
  }
`;
const ContainerUpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  padding: 0 2.5rem;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const ContainerLower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  padding: 0 2.5rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const Nav = styled.nav`
  margin: 0 2rem;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;

    li {
      padding: 0 1rem;
      margin: 0;
      width: 100%;
      position: relative;
      &.has-children {
        ul {
          position: absolute;
          left: 0;
          z-index: 3;
          background-color: var(--color-brand-gray-6);
          border: 1px var(--color-brand-gray-6) solid;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.15s ease-in;
          flex-direction: column;
        }
        &:hover,
        &:focus {
          ul {
            visibility: visible;
            opacity: 1;
          }
        }
        li {
        }
      }
      a {
        .fa-angle-right {
          display: none;
        }
        position: relative;
        padding: 1rem 0;
        display: block;
      }
    }
  }
  @media (max-width: 767px) {
    overflow: auto;
    margin: 0;
    max-width: 250px;
    min-width: 150px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2;
    transform: translateX(-100%);
    -webkit-transition: -webkit-transform 0.3s ease 0s;
    transition: -webkit-transform 0.3s ease 0s;
    transition: transform 0.3s ease 0s;
    transition: transform 0.3s ease 0s, -webkit-transform 0.3s ease 0s;
    overflow-x: hidden;

    &.active {
      transform: translateX(0);
    }
    ul {
      margin: 0;
      flex-direction: column;
      padding: 2rem 1rem 0;

      li {
        padding: 0;
        border-bottom: 1px solid;
        margin: 0;
        text-align: left;
        &.has-children {
          ul {
            padding: 0 0 0 0.5rem;
            display: none;

            li {
              &:last-child {
                border-bottom: none;
              }
              a {
                padding: 0.5rem 0;
              }
            }
          }
          a {
            .fa-angle-right {
              transition: transform 0.2s ease-in-out;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%) rotate(0deg);
            }
          }
        }
        &.active {
          ul {
            display: block;
          }
          a {
            .fa-angle-right {
              transform: translateY(-50%) rotate(90deg);
            }
          }
        }
      }
    }
  }
`;
const NavBtn = styled.span`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: #fff;
    padding: 0.5rem;
    z-index: 2;

    &:hover {
      cursor: pointer;
      cursor: hand;
    }
  }
`;
const CloseBtn = styled.span`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    z-index: 3;

    &:hover {
      cursor: pointer;
      cursor: hand;
    }
  }
`;
const Background = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    display: none;

    &.active {
      opacity: 1;
      display: block;
    }
  }
`;

function HeaderV3() {
  const { title, nav, logo, social, author } = UseSiteMetadata();
  const [menuActive, setMenuActive] = useState(false);
  const [subMenuActive, setSubMenuActive] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  // useEffect(() => {
  //   window.addEventListener(
  //     'resize',
  //     () => {
  //       const ismobile = window.innerWidth < 767;
  //       if (ismobile !== isMobile) setIsMobile(ismobile);
  //     },
  //     false
  //   );
  // }, [isMobile]);

  let logoImg;

  if (logo) {
    logoImg = <Img fixed={logo.childImageSharp.fixed} />;
  } else {
    logoImg = <div>{title}</div>;
  }

  function navClick(e) {
    e.preventDefault();
    const bodyTag = document.body.classList;
    if (menuActive === false && window.innerWidth < 767) {
      setMenuActive(true);
      bodyTag.add('nav-open');
    } else {
      setMenuActive(false);
      bodyTag.remove('nav-open');
    }
    return;
  }
  function handleSubNavClick() {
    subMenuActive ? setSubMenuActive(false) : setSubMenuActive(true);
  }

  return (
    <HeaderContainer>
      <Background className={`${menuActive ? 'active' : ''}`}></Background>
      <Container>
        <ContainerUpper>
          <NavBtn id="navMenu--btn" onClick={navClick}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </NavBtn>
          <span className="h2">{logoImg}</span>

          <Search indices={searchIndices} />
        </ContainerUpper>
        <ContainerLower>
          <Nav id="navMenu" className={`${menuActive ? 'active' : ''}`}>
            <CloseBtn id="navMenu--close" onClick={navClick}>
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </CloseBtn>
            <ul>
              {nav.map((navMenu) =>
                navMenu.link === '#' ? (
                  <li
                    key={navMenu.name}
                    className={`nav-item has-children ${
                      subMenuActive ? 'active' : ''
                    }`}
                    onClick={handleSubNavClick}
                  >
                    <Link to={navMenu.link}>
                      {navMenu.name}
                      <FontAwesomeIcon icon={faAngleRight} size="2x" />
                    </Link>
                    <ul className="sub-menu">
                      {navMenu.subNavigation.map((subNavMenu) => (
                        <li key={subNavMenu.name} onClick={navClick}>
                          <Link to={subNavMenu.link}>{subNavMenu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={navMenu.name} onClick={navClick}>
                    <Link to={navMenu.link}>{navMenu.name}</Link>
                  </li>
                )
              )}
            </ul>
          </Nav>
          <ul>
            <li>
              <a href={`https://twitter.com/${social?.twitter || ``}`}>
                <StaticImage
                  src={twitterIcon}
                  alt="twitter icon"
                  placeholder="blurred"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${social?.instagram || ``}`}>
                <StaticImage
                  src={instagramIcon}
                  alt="instagram icon"
                  placeholder="blurred"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href={`https://facebook.com/${social?.facebook || ``}`}>
                <StaticImage
                  src={facebookIcon}
                  alt="facebook icon"
                  placeholder="blurred"
                  layout="fixed"
                  width={10}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href={`https://www.linkedin.com/in/${social?.linkedin || ``}`}>
                <StaticImage
                  src={linkedinIcon}
                  alt="linkedin icon"
                  placeholder="blurred"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li>
              <a href={`https://www.github.com/in/${social?.github || ``}`}>
                <StaticImage
                  src={githubIcon}
                  alt="github icon"
                  placeholder="blurred"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </a>
            </li>
          </ul>
        </ContainerLower>
      </Container>
    </HeaderContainer>
  );
}

HeaderV3.propTypes = {
  title: PropTypes.string,
};

HeaderV3.defaultProps = {
  title: ``,
};

export default HeaderV3;
