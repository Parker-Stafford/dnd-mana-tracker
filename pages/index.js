import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  signIn, signOut, useSession, getSession,
} from 'next-auth/client';

export default function Home({ result }) {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>DnD Mana Tracker</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
      <>
        <div>Not signed in</div> <br />
        <button type="button" onClick={signIn}>Sign in</button>
      </>
      )}
      {session && (
      <>
        <div>Signed in as {session.user.email}</div> <br />
        <div>{ result }</div>
        <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
      </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  const session = await getSession(context);
  let result = null;
  if (session) {
    result = await axios.get(`${process.env.NEXTAUTH_URL}/api/graphql`);
    result = result.data;
  }
  return {
    props:
    { result },
  };
}
