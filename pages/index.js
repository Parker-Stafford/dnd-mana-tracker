import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainSignIn from '../components/MainSignIn';
import NavBar from '../components/NavBar';
import { BodyStyle, DashButton, ButtonWrapper } from '../styles/index.styles';

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
<ButtonWrapper>
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <Link href="/characters"><DashButton type="button">My Characters</DashButton></Link>
            </Col>
            <Col xs={12} md={6}>
              <Link href="/create-character"><DashButton type="button">New Character <br /> +</DashButton></Link>
            </Col>
          </Row>
        </Container>
        </ButtonWrapper>
      </>
      )}
    </>
  );
}
