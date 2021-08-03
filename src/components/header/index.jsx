import Image from 'next/image'
import * as S from './styled'

const Header = () => {
  return (
    <S.Header className="item header">
      <Image src="/header.png" alt="logo" width="500px" height="150px" />
    </S.Header>
  )
}

export default Header
