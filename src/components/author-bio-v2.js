import React from 'react';
import styled from 'styled-components';
import twitterIcon from '../../content/assets/twitter-logo.svg';
import instagramIcon from '../../content/assets/instagram-logo.svg';
import facebookIcon from '../../content/assets/facebook-logo.svg';
import linkedinIcon from '../../content/assets/facebook-logo.svg';
import { GetPostAuthors } from '../hooks/get-post-author';

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
                      <ImgSvgContainer src={twitterIcon} alt="twitter icon"></ImgSvgContainer>
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
                      <ImgSvgContainer src={instagramIcon} alt="instagram icon"></ImgSvgContainer>
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {author.facebook?.handle ? (
                  <li>
                    <a href={`https://facebook.com/${author.facebook?.handle}`}>
                      <ImgSvgContainer src={facebookIcon} alt="facebook icon"></ImgSvgContainer>
                    </a>
                  </li>
                ) : (
                  ''
                )}

                {author.linkedin?.handle ? (
                  <li>
                    <a href={`https://linkedin.com/${author.linkedin?.handle}`}>
                      <ImgSvgContainer src={linkedinIcon} alt="linkedin icon"></ImgSvgContainer>
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
