import React from 'react'
import logo from './header1.png'
import './header.min.css'

function Header () {
  return (
    <div className='item header Header'>
      <img src={logo} className='youtube-logo' alt='logo' />
    </div>
  )
}

export default Header
