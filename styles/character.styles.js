import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BlueButton } from './index.styles';

export const CharImg = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  /* border: 1px solid black; */
`;

export const ImageDiv = styled.div`
  text-align: left;
`;
export const ManaBar = styled(ProgressBar)`
  width: 35%;
  height: 25px;
  margin: 0 15px;
`;

export const CharWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: left;
  font-size: 20px;
  margin-top: 20px;
  padding: 15px;
  border-radius: 5%;
  box-shadow: 0 0 5px 0.1rem #153e90 !important;
`;

export const AddButton = styled(BlueButton)`
  border-radius: 100%;
  padding: 2px 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 35px;
  height: 35px;
  &:focus {
    box-shadow: 0 0 0 0.1rem #153e90 !important;
  }
`;

export const CastButton = styled(BlueButton)`
  margin-left: 10px;
`;

export const BasicHeader = styled.h5`
  display: inline;
  margin-right: 10px;
  margin-bottom: 0;
`;

export const InfoDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const PotsAndRests = styled.div`
  display:flex;
  margin-bottom: 15px;
`;

export const ManaChangerInput = styled.input`
  width: 50px;
  height: 50px;
`;

export const PotionWrap = styled.div`
  margin-bottom: 10px;
  margin-right: 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const PotionDiv = styled.div`
  flex: 1;
  margin: 5px 15px;
`;

export const ManaDiv = styled(PotionDiv)`
  text-align: center;
  margin-left: 5px;
`;

export const ManaChangerTitle = styled.p`
  font-size: 12px;
  height:  5px;
  margin: 0 0 2px;
`;

export const ButtonsDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export const CharButtons = styled(BlueButton)`
  margin: 10px;
`;
