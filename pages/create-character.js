import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React, { useReducer } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import SignIn from '../components/SignIn';
import { CREATE_CHARACTER } from '../apollo/queries';

export default function CreateCharacter() {
  const [session, loading] = useSession();
  const [createChar, { data, error }] = useMutation(CREATE_CHARACTER);
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      name: '',
      maxMana: 0,
      currentMana: 0,
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
    setFormValues({ [id]: value });
  }

  async function createCharacter(event) {
    event.preventDefault();
    const insert = formValues;
    insert.user_id = session.user.id;
    createChar({ variables: insert });
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
          <form onSubmit={createCharacter} onChange={handleFormChange}>
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
              <input id="currentMana" type="number" defaultValue="0" min="0" />
              (defaults to Max mana)
            </label>
            <label htmlFor="photoUrl">
              Photo url:
              <input id="photoUrl" type="text" />
              (must be an image url of type .jpg or .png)
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
          {error && (
            <div>
              There was an error creating your character. Please check your inputs and try again!
            </div>
          )}
          {data && (
            <div>
              {JSON.stringify(data.createCharacter)}
            </div>
          )}
        </>
      )}
    </>
  );
}
