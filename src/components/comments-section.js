import React, { useEffect } from 'react';
import commentBox from 'commentbox.io';

const BlogPostComments = () => {
  useEffect(() => {
    commentBox(
      '5689816050040832-proj',
      {
        className: 'commentbox', // the class of divs to look for
        defaultBoxId: 'commentbox', // the default ID to associate to the div
        tlcParam: 'tlc', // used for identifying links to comments on your page
        sortOrder: 'best', // specify the default comment sort order ("best", "newest", "oldest")
        backgroundColor: null, // default transparent
        textColor: null, // default black
        subtextColor: null, // default grey
        singleSignOn: null, // enables Single Sign-On (for Professional plans only)
        buttonColor: '#ff906e',
        /**
         * Creates a unique URL to each box on your page.
         *
         * @param {string} boxId
         * @param {Location} pageLocation - a copy of the current window.location
         * @returns {string}
         */
        createBoxUrl(boxId, pageLocation) {
          pageLocation.search = ''; // removes query string!
          pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
          return pageLocation.href; // return url string
        },
        /**
         * Fires once the plugin loads its comments.
         * May fire multiple times in its lifetime.
         *
         * @param {number} count
         */
        onCommentCount(count) {},
      },
      []
    );
  });

  return <div class="commentbox"></div>;
};

export default BlogPostComments;
