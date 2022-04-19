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
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Img from 'gatsby-image';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './search';

// import {
//   faBars,
//   faTimes,
//   faAngleRight,
// } from '@fortawesome/free-solid-svg-icons';

const searchIndices = [{ name: `Pages`, title: `Pages` }];

const twitterIcon = '../../content/assets/twitter-logo.svg';
const facebookIcon = '../../content/assets/facebook-logo.svg';
const instagramIcon = '../../content/assets/instagram-logo.svg';
const linkedinIcon = '../../content/assets/linkedin-logo.svg';
const githubIcon = '../../content/assets/github-logo.svg';

const HeaderContainer = styled.header`
  border-bottom: 1px solid #ebebeb;
`;
const CustomContainer = styled.div`
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
// const ContainerUpper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   text-align: center;
//   z-index: 2;
//   align-items: center;
//   justify-content: space-between;
//   z-index: 3;
//   @media (max-width: 767px) {
//     padding: 0 2.5rem;
//     flex-direction: column;
//   }
// `;
// const ContainerLower = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   text-align: center;
//   z-index: 2;
//   align-items: center;
//   justify-content: space-between;
// `;

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

  let logoImg;

  if (logo) {
    logoImg = <Img fixed={logo.childImageSharp.fixed} />;
  } else {
    logoImg = <div>{title}</div>;
  }

  // function navClick(e) {
  //   e.preventDefault();
  //   const bodyTag = document.body.classList;
  //   if (menuActive === false && window.innerWidth < 767) {
  //     setMenuActive(true);
  //     bodyTag.add('nav-open');
  //   } else {
  //     setMenuActive(false);
  //     bodyTag.remove('nav-open');
  //   }
  //   return;
  // }

  // function handleSubNavClick() {
  //   subMenuActive ? setSubMenuActive(false) : setSubMenuActive(true);
  // }

  return (
    <HeaderContainer className="container-xl py-lg-3 pt-2 mb-3">
      <Background className={`${menuActive ? 'active' : ''}`}></Background>
      <CustomContainer>
        <div className="container-fluid d-flex flex-lg-row flex-column justify-content-between align-items-center">
          <Link to="/">
            <span className="h2">{logoImg}</span>
          </Link>
          <ul className="d-flex">
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
        </div>
        {/* <ContainerLower> */}
        <Navbar expand="lg" className="container-fluid px-0">
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />

            <Nav className="container-fluid px-0 d-none d-lg-flex justify-content-between align-items-center">
              <div className="d-flex">
                {nav.map((navMenu) =>
                  navMenu.link === '#' ? (
                    <NavDropdown
                      as="div"
                      title={navMenu.name}
                      id="basic-nav-dropdown"
                      key={navMenu.name}
                      className="me-2"
                    >
                      {navMenu.subNavigation.map((subNavMenu) => (
                        <NavDropdown.Item as="div" key={subNavMenu.name}>
                          <Link className="d-block" to={subNavMenu.link}>
                            {subNavMenu.name}
                          </Link>
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : (
                    <Nav.Link as="div">
                      <Link className="d-block" to={navMenu.link}>
                        {' '}
                        {navMenu.name}
                      </Link>
                    </Nav.Link>
                  )
                )}
              </div>
              <Search indices={searchIndices} />
            </Nav>

            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="me-auto">
                  {nav.map((navMenu) =>
                    navMenu.link === '#' ? (
                      <NavDropdown
                        as="div"
                        title={navMenu.name}
                        id="basic-nav-dropdown"
                        key={navMenu.name}
                      >
                        {navMenu.subNavigation.map((subNavMenu) => (
                          <NavDropdown.Item as="div" key={subNavMenu.name}>
                            <Link className="d-block" to={subNavMenu.link}>
                              {subNavMenu.name}
                            </Link>
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link as="div">
                        <Link className="d-block" to={navMenu.link}>
                          {' '}
                          {navMenu.name}
                        </Link>
                      </Nav.Link>
                    )
                  )}
                </Nav>
                <Search indices={searchIndices} />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        {/* </ContainerLower> */}
      </CustomContainer>
    </HeaderContainer>
  );
}

export default HeaderV3;
