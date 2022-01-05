const indexName = `Pages`
const pageQuery = `{
  pages:  allWpPost {
    edges {
      node {
        id
        slug
        title
        excerpt
      }
    }
  }
}`
function pageToAlgoliaRecord({ node: { id, slug, title, ...rest } }) {
  return {
    objectID: id,
    slug,
    title,
    ...rest,
  }
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
    matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
  },
]
module.exports = queries