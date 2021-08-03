import React from 'react'
import logo from './header1.png'

import * as S from './styled'

const Header = () => {
  return (
    <S.Header className="item header">
      <S.YoutubeLogo src={logo} alt="logo" />
    </S.Header>
  )
}

export default Header
