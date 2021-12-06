import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header-v2"
import Footer from "./footer"


const LayoutV2 = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQueryV2 {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
        {isHomePage ? (
         <Header></Header>
        ) : (
          <Header></Header>
        )}

       <main className="global-wrapper">{children}</main>
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

export default LayoutV2
