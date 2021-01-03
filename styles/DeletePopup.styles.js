import styled from 'styled-components';
import { BlueButton } from './index.styles';

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
width: 400px;
padding: 40px 0;
text-align: center;
`;

export const DeleteButton = styled(BlueButton)`
  margin: 20px 10px 0;
`;
