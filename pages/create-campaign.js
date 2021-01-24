import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { UPSERT_CAMPAIGN } from '../apollo/queries';
import SignIn from '../components/SignIn';
import NavBar from '../components/NavBar';
import CreateCampForm from '../components/CreateCampForm';
import { Title, FormWrapper } from '../styles/create-character.styles';

export default function CreateCampaign() {
  const [session, loading] = useSession();
  const [upsertCamp, { data, error }] = useMutation(UPSERT_CAMPAIGN);

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
            <CreateCampForm upsertFunc={upsertCamp} userId={session.user.id} />
          </FormWrapper>
          {error && (
            <div>
              There was an error creating a new campaign. Please try again!
              {JSON.stringify(error)}
            </div>
          )}
          {data && (
            <div>
              Campaign created!
              {JSON.stringify(data)}
            </div>
          )}
        </>
      )}
    </>
  );
}
