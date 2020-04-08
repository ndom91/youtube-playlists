import styled from 'styled-components'

export const VideoCard = styled.div`
  width: 150px;
  height: 150px;
  margin: 25px 10px;
  position: relative;
  display: inline-block;
  z-index: 1001;

  &:hover {
    cursor: pointer;

    .cardInfos {
      transform: translateY(-70px);
    }
    .cardThumbnail {
      transform: translateY(-20px);
    }
  }
`

export const Article = styled.article`
  margin: auto 0;
  width: 150px;
  height: 150px;
  border-radius: 6px;
  box-shadow: 5px 5px 10px 1px rgba(30, 16, 39, 0.2);
  overflow: hidden;
  position: relative;

  & a {
    text-decoration: none;
  }
`

export const CardThumb = styled.img`
    width: auto;
    height: 120px;
    margin-left: -30px;
    margin-top: -5px;
    background-size: cover;
    background-position: center;
    border-radius: 3px;
    transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
`

export const CardInfos = styled.div`
  width: auto;
  height: 177px;
  margin-top: -7px;
  position: relative;
  padding: 5px 8px;
  background: #fff;
  transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
`

export const CardTitle = styled.h2`
  position: relative;
  margin: 1px 0;
  color: #152536;
  font-family: 'Francois One', sans-serif;
  line-height: 15px;
  font-size: 0.8rem;
  text-transform: uppercase;
  text-shadow: 0 0 0px #32577f;
  height: 4.2em;
  overflow: hidden;

  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: rgba(21, 37, 54, 0.7);
  font-family: 'Francois One', sans-serif;

  &:after {
    text - align: left;
    top: 0;
    left: 0;
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 17.2em;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 60 %);
  }
`

export const CardChannel = styled.h3`
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: rgba(21, 37, 54, 0.7);
  font-family: 'Francois One', sans-serif;
  text-align: right !important;
  position: absolute;
  line-height: 1.2em;
  right: 8px;
  bottom: 73px;
`

export const CardBtn = styled.button`
  position: absolute;
  top: -15px;
  left: -10px;
  z-index: 1;
  color: #fff;
  width: 37px;
  height: 37px;
  border-radius: 50 %;
  cursor: pointer;
  vertical-align: middle;
  border: none;
  border-radius: 10px;
  outline: rgba(250, 215, 161, 0.7);

  transition: box-shadow 0.15s ease, transform 0.15s ease;
  will-change: box-shadow, transform;
  text-shadow: 0 1px 0 #4b5ef0;
  background: linear-gradient(#aeb7ff,#5468ff) no-repeat;
  box-shadow: 0 7px 13px -3px rgba(45, 35, 66, 0.3), 0 2px 4px 0 rgba(45, 35, 66, 0.4), inset 0 -2px 0 0 #4b58ba;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &:active {
    outline: rgba(250, 215, 161, 0.7);
    border-style: inset;
    border-width: 0px;
    background-blend-mode: multiply, normal;
    background-image: linear-gradient(#5468ff,#5468ff), linear-gradient(to top,#fff,#e4e4e9) no-repeat;
    box-shadow: inset 0 2px 0 1px rgba(132, 138, 184, 0.11), inset 0 2px 9px 0 rgba(93, 100, 148, 0.5), inset 0 -1px 0 1px #5468ff;
    transform: translateY(2px);
  }
`

export const FetchLoader = styled.div`
  background: rgba(0,0,0,0.0);
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  transition: all 150ms ease-in-out;

  width: 150px;
  height: 150px;
  position: relative;
  display: inline-block;
  z-index: 1001;
`

export const CubeContainer = styled.div`
  position: relative;
  perspective: 160px;
  width: 180px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 150ms linear;
`

export const Cube = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  transform-style: preserve-3d;
  transform: translateZ(-20px); 
  animation: rubrik 4s infinite cubic-bezier(.68,-.55,.265,1.55);

  & div {
    margin: 0;
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
  }

  & .front {
    transform: rotateY(0deg) translateZ( 20px ); 
    background-color: #7CD4DF; 
  }

  & .back {
    transform: rotateX(180deg) translateZ(20px);
    background-color: #89BA5F; 
  }

  & .right {
    transform: rotateY(90deg) translateZ(20px);
    background-color: #E4B83A; 
  }
  & .left {
    transform: rotateY(-90deg) translateZ(20px);
    background-color: #C386C6; 
  }
  & .top {
    transform: rotateX(90deg) translateZ(20px);
    background-color: #cb732b;   
  }
  & .bottom {
    transform: rotateX(-90deg) translateZ(20px);
    background-color: #C75875;   
  }

  @keyframes rubrik {
    0% {
      transform: rotateY(0) rotateZ(0) rotateX(0);
    }
    16% {
      transform: rotateY(90deg) rotateZ(0) rotateX(0);
    }
    33% {
      transform: rotateY(90deg) rotateZ(90deg) rotateX(0);
    }
    50% {
      transform: rotateY(90deg) rotateZ(180deg) rotateX(0);
    }
    66% {
      transform: rotateY(180deg) rotateZ(180deg) rotateX(0);
    }  
    83% {
      transform: rotateY(180deg) rotateZ(180deg) rotateX(-90deg);
    }  
    100% {
      transform: rotateY(180deg) rotateZ(180deg) rotateX(-180deg);
    }
  }
`

export const Shadow = styled.div`
  width: 40px;
  height: 5px;
  position: absolute;
  top: 130px;
  left: 70px;
  background: black;
  opacity: 0.25;
  border-radius: 40%;
  color: rgba(0,0,0,0);
`
