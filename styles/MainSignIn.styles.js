import styled from 'styled-components';

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
