import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const FBButton = styled(Button)`
  background-color: #4267b2;
  padding-left: 14px;
  color: white;
  font-family: Helvetica, Arial, sans-serif !important;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  height: 46px;
  width: 272.906px;
  align-items: center;
  &:focus {
    outline: -webkit-focus-ring-color auto 1px;
    box-shadow: none;
  }
  &:active:focus {
    box-shadow: none !important;
  }
`;

export const FBIcon = styled.i`
  font-size: 24px;
  margin-right: 12px;
`;

export const GButton = styled(Button)`
  background-color: white;
  padding-left: 0;
  color: rgba(0,0,0,.54);
  width: 272.906px;
  height: 46px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:focus {
    box-shadow: none;
  }
  &:active:focus {
    box-shadow: none !important;
  }
`;

export const GText = styled.div`
  margin-left: 24px;
`;

export const ProviderDiv = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.div`
  margin-bottom: 20px;
`;

export const ProvidersWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 500px;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 20px black;
`;
