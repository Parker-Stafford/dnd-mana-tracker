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

export const BodyHeight = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const WhiteButton = styled(Button)`
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

export const BlueButton = styled(Button)`
  border-color: #153e90;
  color: white;
  background-color: #153e90;
  padding: 4px 20px;
  z-index: 1;
  &:hover {
    background-color: white;
    color: #153e90;
    border-color: #153e90;
  }
  &:active {
    border-color: #153e90 !important;
    color: white !important;
    background-color: #153e90 !important;
  }
  &:focus {
    background-color: white !important;
    color: #153e90 !important;
    border-color: white !important;
    box-shadow: 0 0 0 0.2rem #153e90 !important;
  }
  &:disabled {
    background-color: grey;
    border-color: #153e90;
    color: black;
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
  &:hover {
    background-color: #153e90;
    color: white;
    border: 1px solid white;
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

export const MainWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const DeleteAcc = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
`;
