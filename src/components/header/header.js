import React from 'react'
import logo from './youtube-logo3-white.png'
import './header.min.css'

function Header () {
  return (
    <div className='item header Header'>
      <img src={logo} className='youtube-logo' alt='logo' />
      <span className='header-text'>
          YT Playlists
      </span>
    </div>
  )
}

export default Header
