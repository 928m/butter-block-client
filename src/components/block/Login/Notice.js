import styled from 'styled-components';

const Notice = styled.p`
  display: block;
  width: 200px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 30px;
  color: #ffffff;
  text-align: center;
  margin: 0 0 50px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 1);
  animation: opacity .5s;

  @keyframes opacity {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Notice;
