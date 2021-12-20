import React from 'react';
// import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components';
import twitterIcon from '../../content/assets/twitter-logo.svg';
import instagramIcon from '../../content/assets/instagram-logo.svg';
import facebookIcon from '../../content/assets/facebook-logo.svg';

import { GetPostAuthors } from '../hooks/get-post-author';

const ImgSvg = styled.img`
  width: 30px;
  fill: #000;
`;

// const Bio = () => {
//   const data = useStaticQuery(graphql`
//     query BioQuery {
//       avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
//         childImageSharp {
//           fixed(width: 100, height: 100, quality: 95) {
//             ...GatsbyImageSharpFixed
//           }
//         }
//       }
//       site {
//         siteMetadata {
//           author {
//             name
//             summary
//           }
//           social {w
//             twitter
//           }
//         }
//       }
//     }
//   `)
// }

function BioV2({ authorName, authorDescription, authorAvatarUrl }) {
  const { nodes } = GetPostAuthors();

  // Set these values by editing "siteMetadata" in gatsby-config.js
  // const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social
  // const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {nodes.map((author) => {
        if (authorName === author.name) {
          return (
            <div key={author.id}>
              <img src={authorAvatarUrl} alt={`${author.name} avatar`} />
              <div>{author.name}</div>
              <div>{authorDescription}</div>
              <ul>
                <li>
                  <a href={`https://twitter.com/${author.twitter}`}>
                    <ImgSvg
                      src={twitterIcon}
                      alt="twitter icon"
                      width="30"
                    ></ImgSvg>
                  </a>
                </li>
                <li>
                  <a href={`https://instagram.com/${author.instagram}`}>
                  <ImgSvg
                      src={instagramIcon}
                      alt="instagram icon"
                      width="30"
                    ></ImgSvg>
                  </a>
                </li>
                <li>
                  <a href={`https://facebook.com/${author.facebook}`}>
                  <ImgSvg
                      src={facebookIcon}
                      alt="facebook icon"
                      width="30"
                    ></ImgSvg>
                  </a>
                </li>
              </ul>
            </div>
          );
        }
      })}
      {/* {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow him on Twitter
          </a>
        </p>
      )} */}
    </div>
  );
}

export default BioV2;
