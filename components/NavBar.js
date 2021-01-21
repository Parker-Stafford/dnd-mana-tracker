import React from 'react';
import { signOut } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { DELETE_USER } from '../apollo/queries';
import {
  BlueNavBar,
  WhiteDropDown,
  WhiteToggle,
  BrandFont,
  DeleteAcc,
} from '../styles/index.styles';

export default function NavBar({ session }) {
  const [deleteUser, { data, error }] = useMutation(DELETE_USER);
  console.log(session);
  return (
    <>
      {!data && (
      <BlueNavBar variant="dark">
        <BrandFont href="/"><i className="fas fa-flask" /> DnD Mana Tracker</BrandFont>
        <Nav className="mr-auto">
          <Nav.Link href="/">
            Home
          </Nav.Link>
          <Nav.Link href="/characters">
            My Characters
          </Nav.Link>
          <Nav.Link href="/create-character">
            New Character
          </Nav.Link>
          <Nav.Link href="/campaigns">
            My Campaigns
          </Nav.Link>
          <Nav.Link href="/create-campaign">
            New Campaign
          </Nav.Link>
        </Nav>
        <WhiteDropDown>
          <WhiteToggle>
            {session.user.email}
          </WhiteToggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>
              Sign out
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { deleteUser({ variables: { id: session.user.id } }); }}>
              Delete account
            </Dropdown.Item>
          </Dropdown.Menu>
        </WhiteDropDown>
      </BlueNavBar>

      )}
      {error && (
        <div>Error deleting your account. Please try again!</div>
      )}
      {data && (
        <DeleteAcc>Account successfully deleted. Refresh the page to make a new account.</DeleteAcc>
      )}
    </>
  );
}
