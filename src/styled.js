import styled from 'styled-components'

export const ClipboardThumbnail = styled.img`
  position: absolute;
  left: 0;
  height: 100%;
  width: auto;
  box-sizing: border-box;
  box-shadow: inset -250px 0 50px 10px #FFF;
  z-index:100;
  border-radius: 5px 0 0 5px;
`

export const ThumbFade = styled.div`
  z-index: 110;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0 5px 5px 0;
  background: linear-gradient(to right, #ffffff00 0%,#B39CD0 45%);
`

export const ModalText = styled.div`
  position: absolute;
  text-align: center;
  width: 300px;
  right: 7px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  padding: 10px 20px;
  z-index: 150;

  &.modal-header-text {
    font-weight: 400;
  }

  &.video-text {
    top: 67px;
    left: 320px;
    width: 320px;
    max-height: 45px;
    color: #5e3e81;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.footer-text {
    font-weight: 400;
    bottom: 47px;
  }
`
