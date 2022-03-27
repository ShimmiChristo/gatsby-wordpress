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
    <div className="bio py-5 my-5 border-top border-bottom">
      {nodes.map((author) => {
        if (authorName === author.name) {
          return (
            <div key={author.id}>
              <div className="d-flex mb-3">
                {authorAvatarUrl ? (
                  <img src={authorAvatarUrl} alt={`${author.name} avatar`} className="me-3" />
                ) : (
                  ''
                )}
                <div>
                  <div className='mb-2'>{author.name}</div>
                  <ul className="d-flex p-0 m-0">
                    {author.twitter?.handle ? (
                      <li className="pe-3">
                        <a
                          href={`https://twitter.com/${author.twitter?.handle}`}
                        >
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
                      <li className="pe-3">
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
                      <li className="pe-3">
                        <a
                          href={`https://facebook.com/${author.facebook?.handle}`}
                        >
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
                      <li className="pe-3">
                        <a
                          href={`https://linkedin.com/${author.linkedin?.handle}`}
                        >
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
              </div>
              <div>{authorDescription}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default BioV2;
