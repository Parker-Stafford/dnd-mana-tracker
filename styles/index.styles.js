import styled, { createGlobalStyle } from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export const BodyStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.session ? 'white' : '#153e90')}
  }
`;

export const BlueNavBar = styled(Navbar)`
  background-color: #153e90 !important;
  color: white !important;
`;

export const BrandFont = styled(Navbar.Brand)`
  font-family: 'Righteous', cursive;
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

export const ButtonWrapper = styled.div`
  text-align: center;
  width: 75%;
  margin: 200px auto 0;
`;
export const DashButton = styled(Button)`
  margin: 10px auto;
  width: 250px;
  height: 250px;
  font-size: 40px;
  background-color: #153e90;
  &:hover {
    background-color: white;
    color: #153e90;
    border-color: #153e90;
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
