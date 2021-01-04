import React from 'react';
import Head from 'next/head';
import { useSession, getSession } from 'next-auth/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initializeApollo } from '../apollo/config';
import { GET_CHARACTERS } from '../apollo/queries';
import SignIn from '../components/SignIn';
import Char from '../components/Char';
import NavBar from '../components/NavBar';
import { CardWrapper, BlueCard } from '../styles/Char.styles';
import { Title } from '../styles/create-character.styles';

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
          <NavBar session={session} />
          <Title>Characters</Title>
          <CardWrapper as={Container}>
            <Row>
              {characters.map((character) => (
                <BlueCard as={Col} lg={3} md={6} xs={12}>
                  <Char
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    photoUrl={character.photo_url}
                    level={character.level}
                    currentMana={character.current_mana}
                    maxMana={character.max_mana}
                  />
                </BlueCard>
              ))}
            </Row>
          </CardWrapper>
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
    const client = initializeApollo();
    const result = await GET_CHARACTERS(session.user.id, client);
    characters = result.data.characters;
  }
  return {
    props:
    { characters },
  };
}
