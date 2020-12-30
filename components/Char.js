import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { CharImg } from '../styles/characters.styles.js';
import { DELETE_CHARACTER } from '../apollo/queries';
import DeleteMessage from './DeleteMessage';
import DeletePopup from './DeletePopup';

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
      {!data && (
        <>
          <Link href={`/character/${id}`}>
            <div>
              <div>
                <div><CharImg src={photoUrl || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />{name}</div>
                <div>Level: {level} Mana: {currentMana}/{maxMana}</div>
              </div>
              {error && (
                <div>error deleting character</div>
              )}
            </div>
          </Link>
          <button type="button" onClick={openPopup}>Delete</button>
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
