import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import SignIn from '../components/SignIn';
import NavBar from '../components/NavBar';
import CreateCampForm from '../components/CreateCampForm';
import { Title, FormWrapper } from '../styles/create-character.styles';

export default function CreateCampaign() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Create Campaign</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          <NavBar session={session} />
          <Title>Create a campaign!</Title>
          <FormWrapper>
            <CreateCampForm />
          </FormWrapper>
        </>
      )}
    </>
  );
}
