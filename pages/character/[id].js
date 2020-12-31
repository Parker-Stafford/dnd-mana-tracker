import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession, getSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '../../apollo/config';
import { GET_CHARACTER, DELETE_CHARACTER, UPSERT_CHARACTER } from '../../apollo/queries';
import SignIn from '../../components/SignIn';
import DeleteMessage from '../../components/DeleteMessage';
import DeletePopup from '../../components/DeletePopup';
import UpdatePopup from '../../components/UpdatePopup';
import SpellPopup from '../../components/SpellPopup';
import { CharImg } from '../../styles/characters.styles.js';

export default function Character({ initialCharacter, userId }) {
  const [session, loading] = useSession();
  const [char, setChar] = useState(initialCharacter);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSpell, setShowSpell] = useState(false);
  const [deleteMutation, { data: deleteData, error: deleteError }] = useMutation(DELETE_CHARACTER);
  const [upsertChar, { error: upsertError }] = useMutation(UPSERT_CHARACTER);

  async function deleteChar() {
    await deleteMutation({ variables: { id: char.id } });
  }

  function openUpdate() {
    setShowUpdate(true);
  }
  function closeUpdate() {
    setShowUpdate(false);
  }
  function openDelete() {
    setShowDelete(true);
  }
  function closeDelete() {
    setShowDelete(false);
  }
  function openSpell() {
    setShowSpell(true);
  }
  function closeSpell() {
    setShowSpell(false);
  }

  async function updateChar(update) {
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
    closeUpdate();
  }

  async function drinkPotion(event) {
    const potionType = event.target.id;
    const update = { variables: { id: char.id, user_id: userId, maxMana: char.max_mana } };
    if (potionType === 'manaPots') {
      update.variables[potionType] = char.mana_pots - 1;
      update.variables.currentMana = Math.min(char.current_mana + 10, char.max_mana);
    } else {
      update.variables[potionType] = char.greater_pots - 1;
      update.variables.currentMana = Math.min(char.current_mana + 20, char.max_mana);
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function takeRest(event) {
    const restType = event.target.id;
    const update = { variables: { id: char.id, user_id: userId, maxMana: char.max_mana } };
    if (restType === 'shortRest') {
      update.variables.currentMana = Math.min(char.current_mana + 10, char.max_mana);
    } else {
      update.variables.currentMana = char.max_mana;
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function castSpell(cost) {
    const update = {
      variables: {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        currentMana: char.current_mana - cost,
      },
    };
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  return (
    <>
      <Head>
        <title>{char.name}</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          {deleteData && (
            <DeleteMessage data={deleteData} />
          )}
          {!deleteData && (
            <>
              <div>{char.name}</div>
              <CharImg src={char.photo_url || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />
              <div>{char.level}</div>
              <div>Mana: {char.current_mana}/{char.max_mana}</div>
              <button id="manaPots" type="button" disabled={!char.mana_pots} onClick={drinkPotion}>Drink mana potion {char.mana_pots}</button>
              <button id="greaterPots" type="button" disabled={!char.greater_pots} onClick={drinkPotion}>Drink greater mana potion {char.greater_pots}</button><br />
              <button id="shortRest" type="button" onClick={takeRest}>Short rest</button>
              <button id="longRest" type="button" onClick={takeRest}>Long rest</button>
              <button id="castSpell" type="button" onClick={openSpell}>Cast spell!</button>
              <br />
              <button type="button" onClick={openDelete}>Delete</button>
              <button type="button" onClick={openUpdate}>Edit</button>
              <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
              {deleteError && (
                <DeleteMessage error={deleteError} data={deleteData} />
              )}
              {upsertError && (
                <>
                  <div>Error updating {char.name} please try again!</div>
                  {JSON.stringify(upsertError)}
                </>
              )}
            </>
          )}
          <br />
          <Link href="/"><button type="button">Home</button></Link>
          <Link href="/create-character"><button type="button">New Character</button></Link>
          <Link href="/characters"><button type="button">Characters</button></Link>
          <DeletePopup
            showing={showDelete}
            name={char.name}
            closeFunc={closeDelete}
            deleteFunc={deleteChar}
          />
          <UpdatePopup
            showing={showUpdate}
            closeFunc={closeUpdate}
            character={char}
            updateFunc={updateChar}
            userId={session.user.id}
          />
          <SpellPopup
            showing={showSpell}
            closeFunc={closeSpell}
            castFunc={castSpell}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  let initialCharacter = null;
  let userId = null;
  if (session) {
    userId = session.user.id;
    const client = initializeApollo();
    const result = await GET_CHARACTER(id, client);
    initialCharacter = result.data.character;
  }
  return {
    props:
    { initialCharacter, userId },
  };
}
