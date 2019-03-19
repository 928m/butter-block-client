import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  color: #181818;
  background: #ffffff;
  border-radius: 5px;
  transition: all .5s;

  &:focus,
  &:hover {
    box-shadow: 0 0 15px #ffffff;
  }
`;

export default Button;
