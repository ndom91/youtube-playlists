import Image from 'next/image'
import logo from './header1.png'

import * as S from './styled'

const Header = () => {
  return (
    <S.Header className="item header">
      <Image src={logo} alt="logo" width="500px" height="150px" />
    </S.Header>
  )
}

export default Header
