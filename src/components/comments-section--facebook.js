import React, { useEffect } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const BlogPostCommentsFB = (link) => {
  return (
    <FacebookProvider appId="473950644350354">
      <Comments
        href={`https://gatsby-wordpress.stripehosting.com${link.uri}`}
        numPosts="5"
        width="100%"
        lazy="true"
        className="fb-comments-count"
      />
    </FacebookProvider>
  );
};

export default BlogPostCommentsFB;
