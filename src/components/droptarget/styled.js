import styled from 'styled-components'

export const HoverDropzone = styled.div`
  position: relative;
  height: 35vh;
  width: 55vw;
  max-width: 550px;
  background: linear-gradient(
    135deg, 
   rgba(250, 215, 161, 1) 10%, 
   rgba(233, 109, 113, 1) 100%
  );
  border-radius: 15px;
  border: 10px solid #fff;
  pointer-events: auto;
  visibility: visible;
  font-size: 62px;
  color: #fff;
  font-family: 'Francois One', sans-serif;
  text-align: center;
  line-height: 35vh;
  box-shadow: 0 0 0 1110px rgba(22, 19, 51, 0.75);
  display: flex;
  justify-content: center;
  align-content: flex-start;
  transition: all 500ms ease-in-out;

  &:before, &:after {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  &.dragging-over {
    /* background: linear-gradient(
      135deg, 
    rgba(207, 166, 103, 1) 10%, 
    rgba(166, 63, 66, 1) 100%
    ); */

    &:before, &:after {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      opacity: 1;
      background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00,#ffff00, #ff0000, #fb0094, 
          #0000ff, #00ff00,#ffff00, #ff0000);
      background-size: 600%;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      z-index: -2;
      border-radius: 15px;
      animation: steam 20s linear infinite;
    }
    
    &:after {
        filter: blur(100px);
    }
  }
  
  @keyframes steam {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 400% 0;
    }
    100% {
        background-position: 0 0;
    }
  }
`

export const DropzoneBtn = styled.button`
  position: absolute;
  right: 0;
  z-index: 1;
  color: #fff;
  width: 37px;
  height: 37px;
  line-height: 37px;
  margin: 10px; 
  font-size: 22px;
  background-image: linear-gradient( 145deg, #BC78EC 10%, #3B2667 100%);
  border-radius: 50%;
  transition: all 250ms linear;
  cursor: pointer;
  border: none;
  outline: rgba(250, 215, 161, 0.7);

  transition: box-shadow 0.15s ease,transform 0.15s ease;
  will-change: box-shadow,transform;
  text-shadow: 0 1px 0 #4b5ef0;
  background: linear-gradient(#aeb7ff,#5468ff) no-repeat;
  box-shadow: 0 7px 13px -3px rgba(45,35,66,0.3), 0 2px 4px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;

  &:hover {
    box-shadow: 0 11px 16px -3px rgba(45,35,66,0.3), 0 4px 5px 0 rgba(45,35,66,0.4), inset 0 -2px 0 0 #4b58ba;
    transform: translateY(-4px);
    cursor: pointer;
  }

  &:active {
    border-style: inset;
    border-width: 0px;
    background-blend-mode: multiply,normal;
    background-image: linear-gradient(#5468ff,#5468ff),linear-gradient(to top,#fff,#e4e4e9) no-repeat;
    box-shadow: inset 0 2px 0 1px rgba(132,138,184,0.11), inset 0 2px 9px 0 rgba(93,100,148,0.5), inset 0 -1px 0 1px #5468ff;
    transform: translateY(2px);
  }
`
