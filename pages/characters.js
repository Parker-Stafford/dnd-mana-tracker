import React from 'react';
import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { signOut, useSession, getSession } from 'next-auth/client';
import { initializeApollo } from '../apollo/config';
import { GET_CHARACTERS } from '../apollo/queries';
import SignIn from '../components/SignIn';
import Char from '../components/Char';

export default function Characters({ characters }) {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Characters</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          {characters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`} passHref>
              <Char
                key={character.id}
                id={character.id}
                name={character.name}
                photoUrl={character.photo_url}
                level={character.level}
                currentMana={character.current_mana}
                maxMana={character.max_mana}
              />
            </Link>
          ))}
          <Link href="/"><button type="button">Home</button></Link>
          <Link href="/create-character"><button type="button">New Character</button></Link> <br />
          <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
        </>
      )}
    </>
  );
}

// Get gql data
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let characters = null;
  if (session) {
    const client = initializeApollo();
    const result = await GET_CHARACTERS(session.user.id, client);
    characters = result.data.characters;
  }
  return {
    props:
    { characters },
  };
}
