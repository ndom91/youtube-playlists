import styled from 'styled-components'

export const Header = styled.div`
  font-size: 56px;
  color: #fff;
  z-index: 100;
  display: flex;
  justify-content: space-around;
`

export const YoutubeLogo = styled.img`
  height: 175px;
  @media only screen and (max-width: 768px) {
    & {
      height: 145px;
    }
  }
`

// .youtube-logo,
// .header-text {
//   line-height: 200px;
//   letter-spacing: 3px;
// }
