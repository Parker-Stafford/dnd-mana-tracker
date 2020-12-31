import React from 'react';
import ReactDOM from 'react-dom';
import spellMap from '../helpers/spellManaMap';
import { Overlay, Popup } from '../styles/DeletePopup.styles';

export default function SpellPopup({
  castFunc, closeFunc, showing,
}) {
  if (!showing) {
    return null;
  }
  async function cast(event) {
    event.preventDefault();
    const level = document.getElementById('spellLevel').value;
    const cost = spellMap[level];
    await castFunc(cost);
    closeFunc();
  }
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFunc} />
      <Popup>
        <form>
          <label htmlFor="spellLevel">Spell level:
            <select id="spellLevel">
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
          <button type="submit" onClick={cast}>Cast!</button>
        </form>

        <br />
        <button type="button" onClick={closeFunc}>Cancel</button>
      </Popup>
    </>,
    document.getElementById('portal'),
  );
}
