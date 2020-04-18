import styled from 'styled-components'
import media from 'styled-media-query'

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  position: absolute;
  bottom: 15px;

   ${media.lessThan('medium')`
    position: relative;
    flex-direction: column;
    justify-content: flex-end;
  `}
`

// PLAY / CLEAR BUTTONS

export const Button = styled.button`
  outline: none;
  text-indent: 0px;
  display: inline-block;
  text-align: center;
  cursor: default;
  box-sizing: border-box;
  padding: 1px 6px;
  border-width: 0px;
  border-style: outset;
  border-color: rgb(221, 221, 221);
  border-image: initial;

  font-family: 'Francois One', sans-serif;
  font-weight: 400 !important;
  font-size: 1.2rem;
  margin: 5px;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 34px;
  color: #fff;
  border-radius: 2em;
  
  height: 55px;
  transition: box-shadow 0.15s ease,transform 0.15s ease;
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
    background-blend-mode: multiply,normal;
    background-image: linear-gradient(#5468ff,#5468ff),linear-gradient(to top,#fff,#e4e4e9) no-repeat;
    box-shadow: inset 0 2px 0 1px rgba(132,138,184,0.11), inset 0 2px 9px 0 rgba(93,100,148,0.5), inset 0 -1px 0 1px #5468ff;
    transform: translateY(2px);
  }

  & span {
    padding: 15px 15px;
  }
`

// VIDEO OPTIONS CHECKBOXES

export const VideoOptions = styled.ul`
  height: 42px;
  list-style: none;
  margin: 0 auto;
  padding: 0px;
  margin-top: 15px;

  .sidebar-fa-icon {
    width: 1.5rem;
    color: rgb(118, 81, 199);
    transition: all 250ms linear;
    position: absolute;
    left: 17px;
    top: 14px;
    font-size: 22px;
  }
`

export const VideoOptionsItem = styled.li`
  outline: none;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  transition: box-shadow 0.15s ease,transform 0.15s ease;
  will-change: box-shadow,transform;
  background: linear-gradient(#fff,#e4e4e9) no-repeat;
  box-shadow: 0 7px 14px -3px rgba(45,35,66,0.3), 0 2px 4px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #cfd1e3;
  border-radius: 25px;

  ${media.lessThan('medium')`
    margin: 15px;
  `}


  &:active {
    background-image: linear-gradient(to top,#fff,#e4e4e9) no-repeat;
    box-shadow: inset 0 2px 0 1px rgba(132,138,184,0.11), inset 0 2px 9px 0 rgba(93,100,148,0.5), inset 0 -1px 0 1px #e4e4e9;
    transform: translateY(2px);
  }
`

export const VideoOptionsLabel = styled.label`
  display: flex;
  width: 70%;
  white-space: nowrap;
  margin: 3px 0px;
  padding: 10px 27px 10px 47px;
  color: rgb(118, 81, 199);
  border-radius: 25px;
  font-size: 1.1rem;
  font-family: 'Francois One', sans-serif;
  user-select: none;
  outline: none;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
`

export const VideoOptionsInput = styled.input`
  position: absolute;
  opacity: 0;
`
