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
import { CharImg } from '../../styles/characters.styles.js';

export default function Character({ initialCharacter }) {
  const [session, loading] = useSession();
  const [char, setChar] = useState(initialCharacter);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [deleteMutation, { data: deleteData, error: deleteError }] = useMutation(DELETE_CHARACTER);
  const [upsertChar, { data: upsertData, error: upsertError }] = useMutation(UPSERT_CHARACTER);

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

  async function updateChar(update) {
    console.log('test');
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
    console.log(upsertData);
    closeUpdate();
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
              <div>Mana pots: {char.mana_pots}</div>
              <div>Greater mana pots: {char.greater_pots}</div>
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
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  let initialCharacter = null;
  if (session) {
    const client = initializeApollo();
    const result = await GET_CHARACTER(id, client);
    initialCharacter = result.data.character;
  }
  return {
    props:
    { initialCharacter },
  };
}
