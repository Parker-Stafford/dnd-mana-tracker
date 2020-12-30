import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession, getSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '../../apollo/config';
import { GET_CHARACTER, DELETE_CHARACTER } from '../../apollo/queries';
import SignIn from '../../components/SignIn';
import Delete from '../../components/Delete';
import { CharImg } from '../../styles/characters.styles.js';

export default function Character({ character }) {
  const [session, loading] = useSession();
  const [deleteMutation, { data, error }] = useMutation(DELETE_CHARACTER);
  async function deleteChar() {
    await deleteMutation({ variables: { id: character.id } });
  }
  return (
    <>
      <Head>
        <title>{character.name}</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && !data && (
        <>
          <div>{character.name}</div>
          <CharImg src={character.photo_url || 'https://i.imgur.com/VKYcZgy.png'} alt="Character" />
          <div>{character.level}</div>
          <div>Mana: {character.current_mana}/{character.max_mana}</div>
          <div>Mana pots: {character.mana_pots}</div>
          <div>Greater mana pots: {character.greater_pots}</div>
          <button type="button" onClick={deleteChar}>Delete</button>
          <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
        </>
      )}
      {session && (
        <>
          <Delete error={error} data={data} />
        </>
      )}
      <br />
      <Link href="/"><button type="button">Home</button></Link>
      <Link href="/create-character"><button type="button">New Character</button></Link>
      <Link href="/characters"><button type="button">Characters</button></Link>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  let character = null;
  if (session) {
    const client = initializeApollo();
    const result = await GET_CHARACTER(id, client);
    character = result.data.character;
  }
  return {
    props:
    { character },
  };
}
