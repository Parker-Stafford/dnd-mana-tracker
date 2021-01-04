import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import { DELETE_CHARACTER } from '../apollo/queries';
import DeleteMessage from './DeleteMessage';
import DeletePopup from './DeletePopup';
import { InnerCardWrap, SmallImage } from '../styles/Char.styles';
import { BlueButton, WhiteButton } from '../styles/index.styles';

export default function Char({
  id, name, photoUrl, level, currentMana, maxMana, create,
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
      {!data && (
        <>
          <Link href={`/character/${id}`}>
            <InnerCardWrap create>
              <SmallImage variant="top" src={photoUrl || 'https://i.imgur.com/29DHf92.png'} alt={`${name}`} />
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
          {create ? <WhiteButton type="button" onClick={openPopup}>Delete</WhiteButton> : <BlueButton type="button" onClick={openPopup}>Delete</BlueButton>}

        </>
      )}
      <DeleteMessage error={error} data={data} />
      <DeletePopup
        showing={showing}
        name={name}
        closeFunc={closePopup}
        deleteFunc={deleteChar}
      />
    </>
  );
}
