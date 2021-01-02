import React from 'react';
import ReactDOM from 'react-dom';
import CreateCharForm from './CreateCharForm';
import { Overlay, Popup } from '../styles/DeletePopup.styles';
import { BlueButton } from '../styles/index.styles';

export default function UpdatePopup({
  updateFunc, closeFunc, showing, character, userId,
}) {
  if (!showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFunc} />
      <Popup style={{ width: 600 }}>
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
        <BlueButton type="button" onClick={closeFunc}>Cancel</BlueButton>
      </Popup>
    </>,
    document.getElementById('portal'),
  );
}
