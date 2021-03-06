import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header-v3"
import Footer from "./footer"


const Layout = ({ isHomePage, children, addClasses }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="container-fluid px-0" data-is-root-path={isHomePage}>
        {isHomePage ? (
         <Header></Header>
        ) : (
          <Header></Header>
        )}

       <main className={`container mx-auto ${addClasses}`}>{children}</main>
      <Footer></Footer>

    </div>
  )
}

// const Layout = ({ location, title, children }) => {
//   const rootPath = `${__PATH_PREFIX__}/`
//   const isRootPath = location.pathname === rootPath
//   // let header

//   // if (isRootPath) {
//   //   header = (
//   //     <h1 className="main-heading">
//   //       <Link to="/">{title}</Link>
//   //     </h1>
//   //   )
//   // } else {
//   //   header = (
//   //     <Link className="header-link-home" to="/">
//   //       {title}
//   //     </Link>
//   //   )
//   // }

//   return (
//     <div data-is-root-path={isRootPath}>
//       <Header></Header>
//       <main className="global-wrapper">{children}</main>
//       <Footer></Footer>
//     </div>
//   )
// }

export default Layout
