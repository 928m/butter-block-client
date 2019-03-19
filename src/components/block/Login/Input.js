import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  margin: 0 0 60px;
  font-size: 20px;
  text-align: center;
  background: transparent;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 255, 255, .7);
  transition: box-shadow .5s;

  &:focus {
    box-shadow: 0 3px 0 #ffffff;
  }
`;

export default Input;
