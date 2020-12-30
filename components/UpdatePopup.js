import React from 'react';
import ReactDOM from 'react-dom';
import CreateCharForm from './CreateCharForm';
import { Overlay, Popup } from '../styles/DeletePopup.styles';

export default function UpdatePopup({
  upsertFunc, closeFunc, showing, character,
}) {
  async function delAndClose() {
    // await deleteFunc();
    closeFunc();
  }

  if (!showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFunc}>
        <Popup>
          <CreateCharForm
            charId={character.id}
            name={character.name}
            maxMana={character.max_mana}
            currentMana={character.current_mana}
            manaPots={character.mana_pots}
            greaterPots={character.greater_pots}
            photoUrl={character.photo_url}
            level={character.level}
          />
          <button type="button" onClick={delAndClose}>Update</button>
          <button type="button" onClick={closeFunc}>Cancel</button>
        </Popup>
      </Overlay>
    </>,
    document.getElementById('portal'),
  );
}
