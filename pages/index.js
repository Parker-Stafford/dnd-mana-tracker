import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import {
  signOut, useSession, getSession,
} from 'next-auth/client';
import GET_CHARACTERS from '../gqlClient/queries';
import SignIn from '../components/SignIn';

export default function Home({ characters }) {
  const [session, loading] = useSession();
  // console.log(session);
  return (
    <>
      <Head>
        <title>DnD Mana Tracker</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
      <>
        <div>Signed in as {session.user.email}</div> <br />
        <div>{characters.map((character) => (character.name))}</div>
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
    console.log(result);
    characters = result.data.characters;
  }
  return {
    props:
    { characters },
  };
}
