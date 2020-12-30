import React from 'react';
import { CharImg } from '../styles/characters.styles.js';

export default function Character({
  name, photoUrl, level, currentMana, maxMana, id,
}) {
  return (
    <>
      <div>
        <div><CharImg src={photoUrl || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />{name}</div>
        <div>Level: {level} Mana: {currentMana}/{maxMana}</div>
      </div>
    </>
  );
}
