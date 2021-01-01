import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import MainNoSession from '../components/MainNoSession';
import { BodyStyle } from '../styles/index.styles';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title>DnD Mana Tracker</title>
      </Head>
      <BodyStyle session={session} />
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <MainNoSession />
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
