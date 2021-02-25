import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import MainIcon from './animated-star.gif';

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {/**Main Icon */}
      <img src={MainIcon} className="main-icon"/>

       {/**Home 돌아가기 */}
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}

      {/**포트폴리오 가기 */}
      {isRoot &&(
        <a href="https://call203.github.io/MyPortfolio/" className="portfolio-txt">
        포트폴리오 구경가기
      </a>
      )}
    </div>
  )
}
