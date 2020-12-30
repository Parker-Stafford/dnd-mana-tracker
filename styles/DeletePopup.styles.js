import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, .4);
`;

export const Popup = styled.div`
position: fixed;
top: 50%;
left: 50%;
z-index: 5;
width: 50%;
background-color: white;
transform: translate(-50%, -50%);
border-radius: 12px;
box-sizing: border-box;
`;
