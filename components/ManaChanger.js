import React, { useState } from 'react';

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
      <button onClick={gainMana} type="button">Restore</button>
      <lable htmlFor="manaChanger">
        <input onChange={manaChange} type="number" id="manaChanger" />
      </lable>
      <button onClick={loseMana} type="button">Lose</button>
    </form>
  );
}
