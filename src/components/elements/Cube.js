import React from 'react';
import styled from 'styled-components';

const CubeBox = styled.div`
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transform-origin: bottom;
  animation: cube 1.6s infinite;

  & > div {
    position: absolute;
    left: 0;
    top: 0;
    animation: melt 6s ease-in 2s both;
    transform-style: preserve-3d;
  }

  & > div > div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    border-radius: 3px;
    background: rgba(250, 223, 72, 0.3);
    background: linear-gradient(rgba(252, 219, 35, 0.3), rgba(255, 188, 44, 0.3));
    box-shadow: 0 0 40px rgba(251, 188, 5, 0.2);
  }

  & > div > div:nth-child(1) {
    transform: translate3d(0, 0, 50px);
  }

  & > div > div:nth-child(2) {
    transform: rotateX(90deg) translate3d(0, 0, 50px);
  }

  & > div > div:nth-child(3) {
    transform: rotateX(180deg) translate3d(0, 0, 50px);
  }

  & > div > div:nth-child(4) {
    transform: rotateX(270deg) translate3d(0, 0, 50px);
    animation: puddle 6s ease-in 2s both;
    box-shadow: -9px 7px 60px rgba(151, 88, 5, 0.5);
  }

  & > div > div:nth-child(5) {
    transform: rotateY(90deg) translate3d(0, 0, 50px);
  }

  & > div > div:nth-child(6) {
    transform: rotateY(-90deg) translate3d(0, 0, 50px);
  }

  @keyframes cube {
    0% {
      transform: rotateX(-30deg) rotateY(35deg) translate(-50%, -50%) scaleY(1);
    }
    50% {
      transform: rotateX(-30deg) rotateY(35deg) translate(-50%, -50%) scaleY(0.8);
    }
    100% {
      transform: rotateX(-30deg) rotateY(35deg) translate(-50%, -50%) scaleY(1);
    }
  }

  @keyframes dot {
    0% {
      transform: rotateX(50deg) rotateZ(-30deg) translate(-34px, -80px) scale(1);
    }
    50% {
      transform: rotateX(50deg) rotateZ(-30deg) translate(-34px, -80px) scale(1.05);
    }
    100% {
      transform: rotateX(50deg) rotateZ(-30deg) translate(-34px, -80px) scale(1);
    }
  }

  .dot {
    display: block;
    width: 100px;
    height: 60px;
    position: relative;
    animation: dot 1.6s infinite;

    &:before {
      display: block;
      content: '';
      width: 100px;
      height: 40px;
      background: rgba(251, 188, 5, 0.2);
      box-shadow: 0 0 40px rgba(251, 188, 5, 0.2);
      border-radius: 30px;
    }

    &:after {
      display: block;
      content: '';
      width: 80px;
      height: 30px;
      background: rgba(251, 188, 5, 0.2);
      box-shadow: 0 0 40px rgba(251, 188, 5, 0.2);
      border-radius: 30px;
      position: relative;
      right: -30px;
    }
  }
`;

const Cube = () => {
  return (
    <div className="cube-wrap">
      <CubeBox>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      </CubeBox>
      <div className="dot"></div>
    </div>
  );
};

export default Cube;
