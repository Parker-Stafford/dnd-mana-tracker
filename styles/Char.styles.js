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
  background-color: ${(props) => (props.create ? '#153e90' : 'white')};
  border-radius: 40px;
  border: none;
  padding: 10px 15px;
  color: black;
`;

export const InnerCardWrap = styled.div`
  background-color: white;
  margin-bottom: 10px;
  &:hover {
    background-color: #dddddd;
    box-shadow: 0 0 15px 5px #757575;
    cursor: pointer;
  }
`;

export const SmallImage = styled(Card.Img)`
  width: 100%;
  @media(min-width: 576px) {
   height: 50vw;
  }
  @media(min-width: 768px) {
    height: 35vw;
  }
  @media(min-width: 992px) {
    height: 18vw;
  }
  @media(min-width: 1200px) {
    height: 13vw;
  }
`;
