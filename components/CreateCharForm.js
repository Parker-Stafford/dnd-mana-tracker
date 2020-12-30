import React, { useReducer, useState } from 'react';

export default function CreateCharForm({
  upsertFunc,
  userId,
  charId,
  name,
  maxMana,
  currentMana,
  manaPots,
  greaterPots,
  photoUrl,
  level,
  creating,
}) {
  const values = {
    name: name || '',
    maxMana: maxMana || 0,
    currentMana: currentMana || null,
    photoUrl: photoUrl || null,
    level: level || 1,
    manaPots: manaPots || 0,
    greaterPots: greaterPots || 0,
    id: charId || 0,
  };

  const [urlWarn, setUrlWarn] = useState(false);
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), values,
  );

  function handleFormChange(event) {
    const { id, value, type } = event.target;
    if (type === 'number') {
      setFormValues({ [id]: +value });
      return;
    }
    if (id === 'photoUrl' && urlWarn) {
      setUrlWarn(false);
    }
    setFormValues({ [id]: value });
  }

  async function createCharacter(event) {
    event.preventDefault();
    const insert = formValues;
    let fileType;
    if (insert.photoUrl) {
      fileType = insert.photoUrl.split('.');
      fileType = fileType[fileType.length - 1];
    }
    if (!fileType || fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png') {
      if (insert.currentMana > insert.maxMana || insert.currentMana === null) {
        insert.currentMana = insert.maxMana;
      }
      insert.user_id = userId;
      const result = await upsertFunc({ variables: insert });
      if (result) {
        document.getElementById('char-create').reset();
      }
    } else {
      setUrlWarn(true);
    }
  }

  return (
    <>
      <form id="char-create" onSubmit={createCharacter} onChange={handleFormChange}>
        <label htmlFor="name">
          Name:
          <input id="name" type="text" defaultValue={name || null} required />
        </label>
        <label htmlFor="maxMana">
          Max mana:
          <input id="maxMana" type="number" min="0" defaultValue={maxMana || '0'} required />
        </label>
        <label htmlFor="currentMana">
          Current mana:
          <input id="currentMana" type="number" min="0" defaultValue={currentMana || null} max={formValues.maxMana} />
          {creating ? '(defaults to Max mana)' : null}
        </label>
        <label htmlFor="photoUrl">
          Photo url:
          <input id="photoUrl" type="text" defaultValue={photoUrl || null} placeholder="https://mana.com/images.jpg" />
          {creating ? '(must be an image url of type .jpg or .png)' : null}
          {urlWarn && (
            <div>Incorrect url type. Please find a different url or leave blank.</div>
          )}
        </label>
        <label htmlFor="level">
          Level:
          <input id="level" type="number" min="1" defaultValue={level || '1'} />
          {creating ? '(defaults to 1)' : null}
        </label>
        <label htmlFor="manaPots">
          Mana potions:
          <input id="manaPots" type="number" min="0" defaultValue={manaPots || '0'} />
          {creating ? '(defaults to 0)' : null}
        </label>
        <label htmlFor="greaterPots">
          Greater mana potions:
          <input id="greaterPots" type="number" min="0" defaultValue={greaterPots || '0'} />
          {creating ? '(defaults to 0)' : null}
        </label>
        <button type="submit">{creating ? 'Create!' : 'Update!'}</button>
      </form>
    </>
  );
}
