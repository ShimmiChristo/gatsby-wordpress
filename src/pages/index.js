import React from 'react';
import { Link, graphql } from 'gatsby';

import AboutSite from '../components/about-site';
import Layout from '../components/layout';
import SEO from '../components/seo';
// import AboutMe from "../components/about-me"
import LatestPosts from '../components/latest-posts';
import FeaturedPosts from '../components/featured-posts';
import Slider from '../components/slider';
import TrendingPosts from '../components/trending-posts';
import PopularPosts from '../components/popular-posts';

const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const canonicalUrl = data.site.siteMetadata.siteURL + location.pathname;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home Page" />
      {/* <AboutSite /> */}
      {/* <AboutMe /> */}
      <Slider />
      <LatestPosts />
      <FeaturedPosts />
      <div className="row">
        <div className="col-md-10">
          <PopularPosts />
        </div>
        <div className="col-md-2">
          <TrendingPosts />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
