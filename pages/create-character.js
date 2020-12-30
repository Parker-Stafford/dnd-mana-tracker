import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React, { useReducer, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import SignIn from '../components/SignIn';
import { UPSERT_CHARACTER } from '../apollo/queries';
import Char from '../components/Char';

export default function CreateCharacter() {
  const [session, loading] = useSession();
  const [urlWarn, setUrlWarn] = useState(false);
  const [upsertChar, { data, error }] = useMutation(UPSERT_CHARACTER);
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      name: '',
      maxMana: 0,
      currentMana: null,
      photoUrl: null,
      level: 1,
      manaPots: 0,
      greaterPots: 0,
    },
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
      insert.user_id = session.user.id;
      const result = await upsertChar({ variables: insert });
      if (result) {
        document.getElementById('char-create').reset();
      }
    } else {
      setUrlWarn(true);
    }
  }
  return (
    <>
      <Head>
        <title>Create Character</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          <form id="char-create" onSubmit={createCharacter} onChange={handleFormChange}>
            <label htmlFor="name">
              Name:
              <input id="name" type="text" required />
            </label>
            <label htmlFor="maxMana">
              Max mana:
              <input id="maxMana" type="number" min="0" defaultValue="0" required />
            </label>
            <label htmlFor="currentMana">
              Current mana:
              <input id="currentMana" type="number" min="0" max={formValues.maxMana} />
              (defaults to Max mana)
            </label>
            <label htmlFor="photoUrl">
              Photo url:
              <input id="photoUrl" type="text" placeholder="https://mana.com/images.jpg" />
              (must be an image url of type .jpg or .png)
              {urlWarn && (
                <div>Incorrect url type. Please find a different url or leave blank.</div>
              )}
            </label>
            <label htmlFor="level">
              Level:
              <input id="level" type="number" min="1" defaultValue="1" />
              (defaults to 1)
            </label>
            <label htmlFor="manaPots">
              Mana potions:
              <input id="manaPots" type="number" min="0" defaultValue="0" />
              (defaults to 0)
            </label>
            <label htmlFor="greaterPots">
              Greater mana potions:
              <input id="greaterPots" type="number" min="0" defaultValue="0" />
              (defaults to 0)
            </label>
            <button type="submit">Create!</button>
          </form>
          <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
          <Link href="/characters"><button type="button">Characters</button></Link>
          <Link href="/"><button type="button">Home</button></Link>
          {error && (
            <div>
              {JSON.stringify(error)}
              There was an error creating your character. Please check your inputs and try again!
            </div>
          )}
          {data && (
            <div>
              Character created, click to go to character page!
              <Char
                name={data.upsertCharacter.name}
                photoUrl={data.upsertCharacter.photo_url}
                level={data.upsertCharacter.level}
                currentMana={data.upsertCharacter.current_mana}
                maxMana={data.upsertCharacter.max_mana}
                id={data.upsertCharacter.id}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
