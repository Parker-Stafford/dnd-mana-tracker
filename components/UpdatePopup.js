import React from 'react';
import ReactDOM from 'react-dom';
import CreateCharForm from './CreateCharForm';
import { Overlay, Popup } from '../styles/DeletePopup.styles';

export default function UpdatePopup({
  updateFunc, closeFunc, showing, character, userId,
}) {
  if (!showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFunc} />
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
          userId={userId}
          upsertFunc={updateFunc}
        />
        <button type="button" onClick={closeFunc}>Cancel</button>
      </Popup>
    </>,
    document.getElementById('portal'),
  );
}
