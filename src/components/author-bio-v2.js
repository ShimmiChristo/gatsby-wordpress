import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { GetPostAuthors } from '../hooks/get-post-author';

const twitterIcon = '../../content/assets/twitter-logo.svg';
const facebookIcon = '../../content/assets/facebook-logo.svg';
const instagramIcon = '../../content/assets/instagram-logo.svg';
const linkedinIcon = '../../content/assets/facebook-logo.svg';
const ImgSvgContainer = styled.img`
  height: 20px;
  width: 20px;
  fill: #000;
`;

function BioV2({ authorName, authorDescription, authorAvatarUrl }) {
  const { nodes } = GetPostAuthors();

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
                {author.twitter?.handle ? (
                  <li>
                    <a href={`https://twitter.com/${author.twitter?.handle}`}>
                      <StaticImage
                        src={twitterIcon}
                        alt="twitter icon"
                        placeholder="blurred"
                        layout="fixed"
                        width={20}
                        height={20}
                      />
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {author.instagram?.handle ? (
                  <li>
                    <a
                      href={`https://instagram.com/${author.instagram?.handle}`}
                    >
                      <StaticImage
                        src={instagramIcon}
                        alt="instagram icon"
                        placeholder="blurred"
                        layout="fixed"
                        width={20}
                        height={20}
                      />
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {author.facebook?.handle ? (
                  <li>
                    <a href={`https://facebook.com/${author.facebook?.handle}`}>
                      <StaticImage
                        src={facebookIcon}
                        alt="facebook icon"
                        placeholder="blurred"
                        layout="fixed"
                        width={10}
                        height={20}
                      />
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {author.linkedin?.handle ? (
                  <li>
                    <a href={`https://linkedin.com/${author.linkedin?.handle}`}>
                      <StaticImage
                        src={linkedinIcon}
                        alt="linkedin icon"
                        placeholder="blurred"
                        layout="fixed"
                        width={20}
                        height={20}
                      />
                    </a>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          );
        }
      })}
    </div>
  );
}

export default BioV2;
