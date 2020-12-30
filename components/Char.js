import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { CharImg } from '../styles/characters.styles.js';
import { DELETE_CHARACTER } from '../apollo/queries';
import Delete from './Delete';

export default function Char({
  id, name, photoUrl, level, currentMana, maxMana,
}) {
  const [deleteMutation, { data, error }] = useMutation(DELETE_CHARACTER);

  async function deleteChar() {
    await deleteMutation({ variables: { id } });
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
          <button type="button" onClick={deleteChar}>Delete</button>
        </>
      )}
      <Delete error={error} data={data} />
    </>
  );
}
