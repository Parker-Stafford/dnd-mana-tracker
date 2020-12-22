import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>DnD Mana Tracker</title>
      </Head>
      {!session && (
      <>
        <div>Not signed in</div> <br />
        <button type="button" onClick={signIn}>Sign in</button>
      </>
      )}
      {session && (
      <>
        <div>Signed in as {session.user.email}</div> <br />
        <button type onClick={signOut}>Sign out</button>
      </>
      )}
    </>
  );
}
