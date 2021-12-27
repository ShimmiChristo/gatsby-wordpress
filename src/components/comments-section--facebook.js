import React, { useEffect } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const BlogPostCommentsFB = () => {
  return (
    <FacebookProvider appId="473950644350354">
      <Comments
        href="https://gatsby-wordpress.stripehosting.com"
        numPosts="5"
        width="100%"
        lazy="true"
        className="fb-comments-count"
      />
    </FacebookProvider>
  );
};

export default BlogPostCommentsFB;
