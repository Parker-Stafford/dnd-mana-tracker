import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import {
  signOut, useSession, getSession,
} from 'next-auth/client';
import GET_CHARACTERS from '../gqlClient/queries';
import SignIn from '../components/SignIn';
import Character from '../components/Character';

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
            <Character
              key={character.id}
              name={character.name}
              photoUrl={character.photo_url}
              level={character.level}
              currentMana={character.current_mana}
              maxMana={character.max_mana}
            />
          ))}
          <Link href="/"><button type="button">Home</button></Link>
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
    const result = await GET_CHARACTERS(session.user.id);
    characters = result.data.characters;
  }
  return {
    props:
    { characters },
  };
}