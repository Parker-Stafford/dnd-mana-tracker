import styled, { createGlobalStyle } from 'styled-components';

export const BodyStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.session ? 'white' : '#153e90')}
  }
`;

export const style = styled.div`

`;
