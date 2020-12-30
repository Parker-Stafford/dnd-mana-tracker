import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { UPSERT_CHARACTER } from '../apollo/queries';
import SignIn from '../components/SignIn';
import Char from '../components/Char';
import CreateCharForm from '../components/CreateCharForm';

export default function CreateCharacter() {
  const [session, loading] = useSession();
  const [upsertChar, { data, error }] = useMutation(UPSERT_CHARACTER);

  return (
    <>
      <Head>
        <title>Create Character</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          <CreateCharForm upsertFunc={upsertChar} userId={session.user.id} creating />
          <button type="button" onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign out</button>
          <Link href="/characters"><button type="button">Characters</button></Link>
          <Link href="/"><button type="button">Home</button></Link>
          {error && (
            <div>
              {JSON.stringify(error)}
              There was an error creating your character. Please check your inputs and try again!
            </div>
          )}
          {data && (
            <div>
              Character created, click to go to character page!
              <Char
                name={data.upsertCharacter.name}
                photoUrl={data.upsertCharacter.photo_url}
                level={data.upsertCharacter.level}
                currentMana={data.upsertCharacter.current_mana}
                maxMana={data.upsertCharacter.max_mana}
                id={data.upsertCharacter.id}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
