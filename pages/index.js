import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import MainSignIn from '../components/MainSignIn';
import NavBar from '../components/NavBar';
import { BodyStyle } from '../styles/index.styles';

export default function Home() {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>DnD Mana Tracker</title>
      </Head>
      <BodyStyle session={session} />
      {!session && (
        <MainSignIn />
      )}
      {session && (
      <>
        <NavBar session={session} />
        <Link href="/characters"><button type="button">Characters</button></Link>
        <Link href="/create-character"><button type="button">New Character</button></Link> <br />
      </>
      )}
    </>
  );
}
