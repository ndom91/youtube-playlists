import styled from 'styled-components'

export const Modal = styled.div`
  width: 670px;
  font-family: 'Francois One', Tahoma, Sans-Serif;
  height: 200px;
  z-index: 500;
  border-radius: 10px;
  background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
  border: 5px solid #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 0 0 1000px rgba(0,0,0,0.4);
  transition: all 200ms linear;

  &:after {
    background: rgba(0,0,0,0.4);
    z-index: 499;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
  }

  &.display-block {
    display: block;
    transition: all 200ms linear;
  }

  &.display-none {
    display: none;
    transition: all 200ms linear;
  }
`

export const ModalBtn = styled.button`
  z-index: 120;
  position: absolute;
  bottom: 10px;
  color: #fff;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  font-family: 'Francois One', Tahoma, Sans-Serif;
  font-size: 1.1rem;
  letter-spacing: 1px;
  background-size: 200% 100%;
  border: none;
  transition: all .4s ease-in-out;

  &:hover {
    cursor: pointer;
    background-position: 100% 20%;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }

  &.btn-add {
    right: 200px;
    background: linear-gradient(to right, #FF6F91, #FF9671);
    border-radius: 20px;
    margin: 0px -5px;
    padding-bottom: 5px;

    transition: box-shadow 0.15s ease,transform 0.15s ease;
    -webkit-transition: box-shadow 0.15s ease,-webkit-transform 0.15s ease;
    -webkit-transition: box-shadow 0.15s ease,transform 0.15s ease;
    will-change: box-shadow,transform;
    text-shadow: 0 1px 0 #4b5ef0;
    background: linear-gradient(#aeb7ff,#5468ff) no-repeat;
    box-shadow: 0 7px 13px -3px rgba(45,35,66,0.3), 0 2px 4px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;

    &:hover {
      box-shadow: 0 11px 16px -3px rgba(45,35,66,0.3), 0 4px 5px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;
      transform: translateY(-2px);
      cursor: pointer;
    }

    &:active {
      border-style: inset;
      border-width: 0px;
      background-blend-mode: multiply,normal;
      background-image: linear-gradient(#5468ff,#5468ff),linear-gradient(to top,#fff,#e4e4e9) no-repeat;
      box-shadow: inset 0 2px 0 1px rgba(132,138,184,0.11), inset 0 2px 9px 0 rgba(93,100,148,0.5), inset 0 -1px 0 1px #5468ff;
      -webkit-transform: translateY(2px);
      -ms-transform: translateY(2px);
      transform: translateY(2px);
    }
  }

  &.btn-close {
    right: 80px;
    background: linear-gradient(to right, rgba(255, 151, 113, 0.774), rgba(249, 249, 113, 0.658));
    border-radius: 20px;
    margin: 0px -5px;
    padding-bottom: 5px;

    transition: box-shadow 0.15s ease,transform 0.15s ease;
    -webkit-transition: box-shadow 0.15s ease,-webkit-transform 0.15s ease;
    -webkit-transition: box-shadow 0.15s ease,transform 0.15s ease;
    will-change: box-shadow,transform;
    text-shadow: 0 1px 0 #4b5ef0;
    background: linear-gradient(#aeb7ff,#5468ff) no-repeat;
    box-shadow: 0 7px 13px -3px rgba(45,35,66,0.3), 0 2px 4px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;

    &:hover {
      box-shadow: 0 11px 16px -3px rgba(45,35,66,0.3), 0 4px 5px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;
      transform: translateY(-2px);
      cursor: pointer;
    }

    &:active {
      border-style: inset;
      border-width: 0px;
      background-blend-mode: multiply,normal;
      background-image: linear-gradient(#5468ff,#5468ff),linear-gradient(to top,#fff,#e4e4e9) no-repeat;
      box-shadow: inset 0 2px 0 1px rgba(132,138,184,0.11), inset 0 2px 9px 0 rgba(93,100,148,0.5), inset 0 -1px 0 1px #5468ff;
      -webkit-transform: translateY(2px);
      -ms-transform: translateY(2px);
      transform: translateY(2px);
    }
  }
`
