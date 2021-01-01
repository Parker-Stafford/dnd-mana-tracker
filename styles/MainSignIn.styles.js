import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const TitleDiv = styled.div`
  width: 75%;
  margin: 250px auto 50px;
  text-align: center;
`;

export const MainTitle = styled.h1`
  font-family: 'Righteous', cursive;
  font-size: 100px;
  color: white;
  @media (max-width: 768px) {
    font-size: 75px;
  }
  @media (max-width: 576px) {
    font-size: 50px;
  }
`;

export const SignInButton = styled(Button)`
  border-color: white;
  color: #153e90;
  background-color: white;
  padding: 4px 20px;
  &:hover {
    background-color: #153e90;
    color: white;
    border-color: white;
  }
  &:active {
    border-color: white !important;
    color: #153e90 !important;
    background-color: white !important;
  }
  &:focus {
    background-color: #153e90 !important;
    color: white !important;
    border-color: white !important;
    box-shadow: 0 0 0 0.2rem white !important;
  }
`;

export const CallToSignIn = styled.div`
  color: white;
  font-size: 30px;
  margin-bottom: 15px;
`;

export const SignInWrapper = styled.div`
  margin: 0 auto;
  width: 75%;
  text-align: center;
`;
