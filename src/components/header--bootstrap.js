/*
 ? Notes
 - using the bootstrap navigation (requires JS) made me download react-bootstrap
 - the bootstrap module was fine until I need JS/react functionality
*/

import React, { useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { UseSiteMetadata } from '../hooks/use-site-metadata';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

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
  padding: 0;
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
      padding-left: 1rem;
    }
  }
`;
const ContainerUpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  @media (max-width: 767px) {
    padding: 0 2.5rem;
    flex-direction: column;
  }
`;
const ContainerLower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    padding: 0 2.5rem;
    flex-direction: column;
  }
`;
// const Nav = styled.nav`
//   ul {
//     list-style: none;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0;
//     padding: 0;

//     li {
//       padding: 0 1rem 0 0;
//       margin: 0;
//       width: 100%;
//       position: relative;

//       &.has-children {
//         ul {
//           position: absolute;
//           left: 0;
//           z-index: 3;
//           background-color: var(--color-brand-gray-6);
//           border: 1px var(--color-brand-gray-6) solid;
//           visibility: hidden;
//           opacity: 0;
//           transition: opacity 0.15s ease-in;
//           flex-direction: column;
//         }

//         li {
//           padding: 0 0 1rem;
//         }

//         &:hover,
//         &:focus {
//           ul {
//             visibility: visible;
//             opacity: 1;
//           }
//         }
//       }

//       a {
//         .fa-angle-right {
//           display: none;
//         }
//         position: relative;
//         text-transform: uppercase;
//         display: block;
//       }
//     }
//   }

//   @media (max-width: 767px) {
//     overflow: auto;
//     margin: 0;
//     max-width: 250px;
//     min-width: 150px;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: #fff;
//     z-index: 2;
//     transform: translateX(-100%);
//     -webkit-transition: -webkit-transform 0.3s ease 0s;
//     transition: -webkit-transform 0.3s ease 0s;
//     transition: transform 0.3s ease 0s;
//     transition: transform 0.3s ease 0s, -webkit-transform 0.3s ease 0s;
//     overflow-x: hidden;

//     &.active {
//       transform: translateX(0);
//     }

//     ul {
//       margin: 0;
//       flex-direction: column;
//       padding: 2rem 1rem 0;

//       li {
//         padding: 0;
//         border-bottom: 1px solid;
//         margin: 0;
//         text-align: left;

//         &.has-children {
//           ul {
//             padding: 0 0 0 0.5rem;
//             display: none;

//             li {
//               &:last-child {
//                 border-bottom: none;
//               }

//               a {
//                 padding: 0.5rem 0;
//               }
//             }
//           }

//           a {
//             .fa-angle-right {
//               transition: transform 0.2s ease-in-out;
//               position: absolute;
//               right: 0;
//               top: 50%;
//               transform: translateY(-50%) rotate(0deg);
//             }
//           }
//         }
//         &.active {
//           ul {
//             display: block;
//           }
//           a {
//             .fa-angle-right {
//               transform: translateY(-50%) rotate(90deg);
//             }
//           }
//         }
//       }
//     }
//   }
// `;
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

function HeaderV3(location) {
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

  // function focusCurrentLocation() {
  //   const currentPath = location.pathname;
  // }

  console.log('location - ', location);
  return (
    <HeaderContainer className="container-xl py-3 mb-3">
      <Background className={`${menuActive ? 'active' : ''}`}></Background>
      <Container>
        <ContainerUpper>
          {/* <NavBtn id="navMenu--btn" onClick={navClick}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </NavBtn> */}
          <span className="h2">{logoImg}</span>

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
        </ContainerUpper>
        <ContainerLower>
          <Navbar expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  {nav.map((navMenu) =>
                    navMenu.link === '#' ? (
                      <NavDropdown
                        as="div"
                        title={navMenu.name}
                        id="basic-nav-dropdown"
                        key={navMenu.name}
                      >
                        {navMenu.subNavigation.map((subNavMenu) => (
                          <NavDropdown.Item
                            as="div"
                            key={subNavMenu.name}
                          >
                            <Link className="d-block" to={subNavMenu.link}>{subNavMenu.name}</Link>
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link as="div">
                        <Link className="d-block" to={navMenu.link}> {navMenu.name}</Link>
                      </Nav.Link>
                    )
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Search indices={searchIndices} />
        </ContainerLower>
      </Container>
    </HeaderContainer>
  );
}

export default HeaderV3;
