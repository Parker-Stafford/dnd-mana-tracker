import React, { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { WhiteButton, BlueButton } from '../styles/index.styles';

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
      <Form id="char-create" onSubmit={createCharacter} onChange={handleFormChange}>
        <Form.Group as={Col}>
          <Form.Label htmlFor="name">
            Name <span>*</span>:
            <Form.Control id="name" type="text" defaultValue={name || null} required />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="maxMana">
            Max mana <span>*</span>:
            <Form.Control id="maxMana" type="number" min="0" defaultValue={maxMana || '0'} required />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="currentMana">
            Current mana:
            <Form.Control id="currentMana" type="number" min="0" defaultValue={currentMana || null} />
            {creating ? <Form.Text>(defaults to Max mana)</Form.Text> : null}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="level">
            Level <span>*</span>:
            <Form.Control id="level" type="number" min="1" defaultValue={level || '1'} />
            {creating ? <Form.Text>(defaults to 1)</Form.Text> : null}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="manaPots">
            Mana potions:
            <Form.Control id="manaPots" type="number" min="0" defaultValue={manaPots || '0'} />
            {creating ? <Form.Text>(defaults to 0)</Form.Text> : null}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="greaterPots">
            Greater mana potions:
            <Form.Control id="greaterPots" type="number" min="0" defaultValue={greaterPots || '0'} />
            {creating ? <Form.Text>(defaults to 0)</Form.Text> : null}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="photoUrl">
            Photo url:
            <Form.Control id="photoUrl" type="text" defaultValue={photoUrl || null} placeholder="https://mana.com/images.jpg" />
            {creating ? <Form.Text>(must be an image url of type .jpg or .png)</Form.Text> : null}
            {urlWarn && (
              <Form.Text>Incorrect url type. Please find a different url or leave blank.</Form.Text>
            )}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col}>
          {creating && (
            <WhiteButton type="submit">Create!</WhiteButton>
          )}
          {!creating && (
            <BlueButton type="submit">Update!</BlueButton>
          )}
        </Form.Group>
      </Form>
    </>
  );
}
