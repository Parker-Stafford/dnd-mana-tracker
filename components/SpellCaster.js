import React, { useState } from 'react';
import spellMap from '../helpers/spellManaMap';
import { BasicHeader, CastButton } from '../styles/character.styles';

export default function SpellCaster({ castFunc }) {
  const [spellLevel, setSpellLevel] = useState('cantrip');

  function changeLevel(event) {
    setSpellLevel(event.target.value);
  }
  async function cast(event) {
    event.preventDefault();
    const cost = spellMap[spellLevel];
    await castFunc(cost);
  }

  return (
    <form>
      <BasicHeader>Spells:</BasicHeader>
      <label htmlFor="spellLevel">
        <select onChange={changeLevel} id="spellLevel">
          <option value="cantrip">Cantrip</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </label>
      <CastButton type="submit" onClick={cast}>Cast!</CastButton>
    </form>
  );
}
