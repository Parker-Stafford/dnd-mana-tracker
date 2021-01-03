import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export const CardWrapper = styled(CardDeck)`
  width: 100%;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
`;

export const BlueCard = styled(Card)`
  background-color: white;
  border-radius: 40px;
  padding: 10px 15px;
`;

export const InnerCardWrap = styled.div`
  &:hover {
    background-color: #dddddd;
    box-shadow: 0 0 15px 5px #757575;
    cursor: pointer;
  }
`;
