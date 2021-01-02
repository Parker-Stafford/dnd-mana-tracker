import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { DELETE_CHARACTER } from '../apollo/queries';
import DeleteMessage from './DeleteMessage';
import DeletePopup from './DeletePopup';
import { BlueCard, InnerCardWrap } from '../styles/Char.styles';
import { BlueButton } from '../styles/index.styles';

export default function Char({
  id, name, photoUrl, level, currentMana, maxMana,
}) {
  const [showing, setShowing] = useState(false);
  const [deleteMutation, { data, error }] = useMutation(DELETE_CHARACTER);

  async function deleteChar() {
    await deleteMutation({ variables: { id } });
  }

  function openPopup() {
    setShowing(true);
  }

  function closePopup() {
    setShowing(false);
  }

  return (
    <>
      <BlueCard as={Col} lg={3} md={6} xs={12}>
        {!data && (
        <>
          <Link href={`/character/${id}`}>
            <InnerCardWrap>
              <Card.Img variant="top" src={photoUrl || 'https://i.imgur.com/29DHf92.png'} alt={`${name}`} />
              <Card.Body>
                <Card.Title>
                  {name}
                </Card.Title>
                <Card.Text>
                  Level: {level}
                </Card.Text>
                <Card.Text>
                  Mana: {currentMana}/{maxMana}
                </Card.Text>
              </Card.Body>
              {error && (
              <div>error deleting character</div>
              )}
            </InnerCardWrap>
          </Link>
          <BlueButton type="button" onClick={openPopup}>Delete</BlueButton>
        </>
        )}
        <DeleteMessage error={error} data={data} />
        <DeletePopup
          showing={showing}
          name={name}
          closeFunc={closePopup}
          deleteFunc={deleteChar}
        />
      </BlueCard>

    </>
  );
}
