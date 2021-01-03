import React, { useState } from 'react';
import { ManaChangerInput, AddButton } from '../styles/character.styles';

export default function ManaChanger({ manaFunc }) {
  const [mana, setMana] = useState(0);

  function manaChange(event) {
    setMana(+event.target.value);
  }

  async function gainMana() {
    if (!mana) {
      return;
    }
    document.getElementById('manaForm').reset();
    await manaFunc(mana, true);
    setMana(0);
  }

  async function loseMana() {
    if (!mana) {
      return;
    }
    document.getElementById('manaForm').reset();
    await manaFunc(mana);
    setMana(0);
  }
  return (
    <form id="manaForm">
      <AddButton onClick={loseMana} type="button">-</AddButton>
      <lable htmlFor="manaChanger">
        <ManaChangerInput onChange={manaChange} type="number" id="manaChanger" min="0" />
      </lable>
      <AddButton onClick={gainMana} type="button">+</AddButton>
    </form>
  );
}
