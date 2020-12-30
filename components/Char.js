import React from 'react';
import { useMutation } from '@apollo/client';
import { CharImg } from '../styles/characters.styles.js';
import { DELETE_CHARACTER } from '../apollo/queries';

const Char = React.forwardRef(({
  id, onClick, href, name, photoUrl, level, currentMana, maxMana,
}, ref) => {
  const [deleteMutation, { data, error }] = useMutation(DELETE_CHARACTER);
  async function deleteChar() {
    const result = await deleteMutation({ variables: { id } });
    console.log(result);
  }
  return (
    <>
      {!data && (
        <a href={href} onClick={onClick} ref={ref}>
          <div>
            <div><CharImg src={photoUrl || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />{name}</div>
            <div>Level: {level} Mana: {currentMana}/{maxMana}</div>
            <button type="button" onClick={deleteChar}>Delete</button>
          </div>
          {error && (
            <div>error deleting character</div>
          )}
        </a>
      )}
      {data && (
        <div>{data.character.name} deleted!</div>
      )}
      {error && (
        <div>error deleting character</div>
      )}
    </>
  );
});

export default Char;
