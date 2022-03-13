const path = require(`path`);
const chunk = require(`lodash/chunk`);
const crypto = require('crypto');
const { google } = require('googleapis');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Google Cloud API
// const auth = new google.auth.GoogleAuth({
//   keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
// });
const ga4Property = process.env.GA4_PROPERTY_ID;
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async (gatsbyUtilities) => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities);
  const categories = await getCategoryPages(gatsbyUtilities);
  const tags = await getTagPages(gatsbyUtilities);

  // If there are no posts in WordPress, don't do anything
  if (!posts.length || !categories.length || !tags.length) {
    return;
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({
    posts,
    categories,
    tags,
    gatsbyUtilities,
  });
  // await createIndividualCategoryPages({ categories, gatsbyUtilities });

  // And a paginated archive
  await createBlogPostArchive({ posts, gatsbyUtilities });
};

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({
  posts,
  categories,
  tags,
  gatsbyUtilities,
}) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post-sidebar.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    ),
    categories.map(({ category }) =>
      gatsbyUtilities.actions.createPage({
        path: category.uri,
        component: path.resolve(`./src/templates/category-page.js`),
        context: {
          id: category.id,
        },
      })
    ),
    tags.map(({ tag }) =>
      gatsbyUtilities.actions.createPage({
        path: tag.uri,
        component: path.resolve(`./src/templates/tag-page.js`),
        context: {
          id: tag.id,
        },
      })
    )
  );

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `);

  const { postsPerPage } = graphqlResult.data.wp.readingSettings;

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage);
  const totalPages = postsChunkedIntoArchivePages.length;

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1;

      const getPagePath = (page) => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/news` : `/news/${page}`;
        }

        return null;
      };

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      });
    })
  );
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpPost.edges;
}

async function getCategoryPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      allWpCategory {
        edges {
          category: node {
            id
            name
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your category pages`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpCategory.edges;
}

async function getTagPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpTags {
      allWpTag {
        edges {
          tag: node {
            id
            name
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your category pages`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpTag.edges;
}

exports.sourceNodes = async ({ actions }) => {
  // https://www.gatsbyjs.com/docs/reference/config-files/actions/#createNode
  const { createNode } = actions;
  const getMostViewedPages = await getGAPages('60daysAgo', 12);
  const getTrendingPages = await getGAPages('30daysAgo', 12);

  await createGANodes(getMostViewedPages, `MostViewedPages`, actions);
  await createGANodes(getTrendingPages, `TrendingPages`, actions);
};

const getGAPages = async (startDateParam, limitParam) =>  {
  // const [response] = await analyticsDataClient.runReport({
  const response = await analyticsDataClient.runReport({
    property: `properties/${ga4Property}`,
    dateRanges: [
      {
        startDate: startDateParam, //30daysAgo
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
    dimensionFilter: {
      filter: {
        stringFilter: {
          matchType: 'FULL_REGEXP',
          value: '^[A-Za-z0-9\-\_\/]{2,}$',
        },
        fieldName: 'pagePath',
      },
    },

    limit: limitParam,
  });

  return response;
}

/* 
  Pass page title, date, category link to getGAPages
  Params: GA Pages Array of objects, name of new node, 
*/
const createGANodes = async (GAResult, nodeName, actions) => {
  for (let { dimensionValues, metricValues } of GAResult[0].rows) {
    let path = dimensionValues[0].value;
    let count = metricValues[0].value;

    actions.createNode({
      uri: path,
      count,
      id: path,
      internal: {
        type: nodeName,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ nodeName, path, count }))
          .digest(`hex`),
        mediaType: `text/plain`,
        description: `Page views per path`,
      },
      
    });
  }
};