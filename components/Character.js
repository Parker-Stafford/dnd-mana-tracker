import React from 'react';

export default function Character({
  name, photoUrl, level, currentMana, maxMana,
}) {
  return (
    <>
      <div>
        <div><img src={photoUrl || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />{name}</div>
        <div>Level: {level} Mana: {currentMana}/{maxMana}</div>
      </div>
    </>
  );
}
