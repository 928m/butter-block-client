import React from 'react';
import styled from 'styled-components';
import Cube from './Cube';
import { Title } from '../StyledComponents';

const LogoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
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
