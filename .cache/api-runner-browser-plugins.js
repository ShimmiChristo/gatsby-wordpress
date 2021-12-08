module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":630,"withWebp":true,"showCaptions":true,"quality":100,"linkImagesToOriginal":true,"markdownCaptions":false,"backgroundColor":"white","withAvif":false,"tracedSVG":false,"loading":"lazy","decoding":"async","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Gatsby Starter Blog","short_name":"GatsbyJS","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"content/assets/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"4a9773549091c227cd2eb82ccd9c5e3a"},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"root":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress","extensions":[".md",".mdx"],"gatsbyRemarkPlugins":[{"resolve":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-remark-images","id":"ec5f72dc-d544-5bf0-a5c5-18611173abf1","name":"gatsby-remark-images","version":"6.3.0","modulePath":"/Users/cshimmin/Documents/_p-projects/ER-Project/gatsby-wordpress/node_modules/gatsby-remark-images/index.js","pluginOptions":{"plugins":[],"maxWidth":800,"quality":70},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"commonmark":false},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":800,"quality":70},
    },{
      plugin: require('../node_modules/gatsby-plugin-styled-components/gatsby-browser.js'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false,"disableVendorPrefixes":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"defaultDataLayer":{"type":"function","value":"function () {\n          return {\n            pageType: window.pageType,\n          };\n        }"},"includeInDevelopment":false,"routeChangeEventName":"gatsby-route-change","enableWebVitalsTracking":false,"selfHostedOrigin":"https://www.googletagmanager.com"},
    },{
      plugin: require('../node_modules/gatsby-plugin-fontawesome-css/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"https://gatsby-wordpress.stripehosting.com/graphql","verbose":true},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
