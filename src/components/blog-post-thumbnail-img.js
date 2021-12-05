import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Image from "gatsby-image"

// import AuthorBio from "./author-bio"
// import SEO from "./seo"

function BlogPostThumbnailImg({
  key,
  slug,
  title,
  featuredImg,
  date,
  description,
  excerpt,
}) {
  const ListContainer = styled.li`
    width: 33%;
    padding: 3%;
    @media (max-width: 767px) {
      width: 100%;
    }
  `
  const ArticleLink = styled(Link)`
    text-decoration: none;
    margin-bottom: var(--spacing-6);
    /* border-bottom: 2px solid;  */
    & :hover {
      text-decoration: underline;
    }
  `
  const ArticleContainer = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    margin: 0;
    text-align: center;
  `
  const ImgContainer = styled.div`
    width: 100%;
    height: 250px;
    overflow: hidden;
    @media (max-width: 767px) {
      width: 100%;
      height: auto;
      min-height: 200px;
      max-height: 250px;
    }
    @media (max-width: 400px) {
      width: 250px;
      height: 250px;
    }
  `
  const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  `
  const FeaturedImg = styled(Image)`
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    @media (max-width: 767px) {
    }
  `
  const CTA = styled(Link)`
    text-transform: uppercase;
    font-weight: var(--fontWeight-bold);
    text-decoration: none;
  `
  const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  `

  return (
    <ListContainer key={key}>
      <ArticleContainer
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Header>
          <ImgContainer>
            <FeaturedImg
              className="featured-img"
              fluid={featuredImg.childImageSharp.fluid}
            />
          </ImgContainer>
          <h3>
            <ArticleLink to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </ArticleLink>
          </h3>
        </Header>
        <Section>
          <small>{date}</small>
          {/* <p
            dangerouslySetInnerHTML={{
              __html: description || excerpt,
            }}
            itemProp="description"
          /> */}
          <CTA to={slug} itemProp="url" className="button">
            <span>see review</span>
          </CTA>
        </Section>
      </ArticleContainer>
    </ListContainer>
  )
}

export default BlogPostThumbnailImg
