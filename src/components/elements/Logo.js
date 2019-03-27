import React from 'react';
import styled from 'styled-components';
import Cube from './Cube';

const LogoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 900;
  color: #ffffff;
  text-align: left;
  letter-spacing: 5px;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 255, 255, .6);
  margin: 0 0 0 30px;
`;

export const Logo = () => {
  return (
    <LogoWrap>
      <Cube />
      <Title>
        butter<br/>
        block.
      </Title>
    </LogoWrap>
  );
};
