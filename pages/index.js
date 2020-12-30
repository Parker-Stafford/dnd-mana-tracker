import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import SignIn from '../components/SignIn';

export default function Home() {
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
        <Link href="/characters"><button type="button">Characters</button></Link>
        <Link href="/create-character"><button type="button">New Character</button></Link> <br />
        <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
      </>
      )}
    </>
  );
}
