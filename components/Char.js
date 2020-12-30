import React from 'react';
import { CharImg } from '../styles/characters.styles.js';

const Char = React.forwardRef(({
  onClick, href, name, photoUrl, level, currentMana, maxMana,
}, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <div>
      <div><CharImg src={photoUrl || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />{name}</div>
      <div>Level: {level} Mana: {currentMana}/{maxMana}</div>
    </div>
  </a>
));

export default Char;
