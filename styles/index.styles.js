import styled, { createGlobalStyle } from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

export const BodyStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.session ? 'white' : '#153e90')}
  }
`;

export const BlueNavBar = styled(Navbar)`
  background-color: #153e90 !important;
  font-family: 'Righteous', cursive;
  color: white !important;
`;

export const WhiteNavItem = styled(Nav.Link)`
  color: white !important;
`;

export const WhiteDropDown = styled(Dropdown)`
  color: #153e90;
  background-color: white;
  border-radius: 25px;
`;

export const WhiteToggle = styled(Dropdown.Toggle)`
  color: #153e90;
  background-color: white;
  border: none;
`;
