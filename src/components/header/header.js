import React from 'react'
import logo from './youtube-logo.svg'
import './Header.css'

function Header() {

  return (
    <div className="item header Header">
        <img src={logo} className="youtube-logo" alt="logo" />
        <span className="header-text">
          YouTube Playlists
        </span> 
    </div>
  )
}

export default Header
