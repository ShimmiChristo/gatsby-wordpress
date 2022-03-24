import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="style guide" />
      <h1>Style Guide</h1>
      <p>
        This theme uses Bootstrap at its foundation. Bootstrap is used for the
        layout, html entities, and font sizes.
      </p>
      <p>
        The style.css is used for custom CSS. Some examples include nested
        elements that need the same styling as its parent. ex - h2 > a. The
        anchor should follow the color and text decoration of the heading
        element.
      </p>

      <hr></hr>

      <h2>Headings</h2>
      <hr></hr>

      <h1>heading 1</h1>
      <h2>heading 2</h2>
      <h3>heading 3</h3>
      <h4>heading 4</h4>
      <h5>heading 5</h5>
      <h6>heading 6</h6>

      <div class="container">
        <div class="row">
          <div class="col">
            <h3>UL</h3>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
          </div>
          <div class="col">
            <h3>OL</h3>
            <ol>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
