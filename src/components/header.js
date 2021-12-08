import React, { useState } from "react"
import { Link } from "gatsby"
import { UseSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

const HeaderContainer = styled.header`
  border-bottom: 1px solid #ebebeb;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 2;
  padding: 0 2.5rem;
`
const Nav = styled.nav`
  max-width: 250px;
  min-width: 150px;
  width: 40%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
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
    list-style: none;
    padding: 2rem;
    margin: 0;

    @media (max-width: 767px) {
      padding: 2rem 1rem 1rem 1rem;
    }

    li {
      border-bottom: 1px solid;
      padding: 1rem 0;
      margin: 0;
      text-align: left;
    }
  }
`
const NavBtn = styled.span`
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
`
const CloseBtn = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;

  &:hover {
    cursor: pointer;
    cursor: hand;
  }
`
const Background = styled.div`
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
`

function Header() {
  const { title, nav, logo } = UseSiteMetadata()
  const [menuActive, setMenuActive] = useState(false)

  let logoImg

  if (logo) {
    logoImg = <Img fixed={logo.childImageSharp.fixed} />
  } else {
    logoImg = <Link>{title}</Link>
  }

  function navClick() {
    menuActive ? setMenuActive(false) : setMenuActive(true)
  }

  return (
    <HeaderContainer>
      <Background className={`${menuActive ? "active" : ""}`}></Background>
      <Container>
        <span>
          {logoImg}
        </span>
        <NavBtn id="navMenu--btn" onClick={navClick}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </NavBtn>
        <Nav id="navMenu" className={`${menuActive ? "active" : ""}`}>
          <CloseBtn id="navMenu--close" onClick={navClick}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </CloseBtn>
          <ul>
            {nav.map(navMenu => (
              <li key={navMenu.name}>
                <Link to={navMenu.link}>
                  {navMenu.name}
                </Link>
              </li>
            ))}
          </ul>
        </Nav>
      </Container>
    </HeaderContainer>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
