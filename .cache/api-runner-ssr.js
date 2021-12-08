var plugins = [{
      name: 'gatsby-plugin-image',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-image/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Gatsby Starter Blog","short_name":"GatsbyJS","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"content/assets/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"4a9773549091c227cd2eb82ccd9c5e3a"},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-mdx',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"root":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress","extensions":[".md",".mdx"],"gatsbyRemarkPlugins":[{"resolve":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-remark-images","id":"ec5f72dc-d544-5bf0-a5c5-18611173abf1","name":"gatsby-remark-images","version":"6.3.0","modulePath":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-remark-images/index.js","pluginOptions":{"plugins":[],"maxWidth":800,"quality":70},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"commonmark":false},
    },{
      name: 'gatsby-plugin-styled-components',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false,"disableVendorPrefixes":false},
    },{
      name: 'gatsby-plugin-google-tagmanager',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"defaultDataLayer":{"type":"function","value":"function () {\n          return {\n            pageType: window.pageType,\n          };\n        }"},"includeInDevelopment":false,"routeChangeEventName":"gatsby-route-change","enableWebVitalsTracking":false,"selfHostedOrigin":"https://www.googletagmanager.com"},
    },{
      name: 'gatsby-plugin-sitemap',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap","createLinkInHead":true,"entryLimit":45000,"query":"{ site { siteMetadata { siteUrl } } allSitePage { nodes { path } } }","excludes":[]},
    },{
      name: 'gatsby-plugin-fontawesome-css',
      plugin: require('/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-plugin-fontawesome-css/gatsby-ssr'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
