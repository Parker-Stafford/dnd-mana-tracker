import React from 'react';
import { signOut } from 'next-auth/client';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BlueNavBar, WhiteDropDown, WhiteToggle } from '../styles/index.styles';

export default function NavBar({ session }) {
  return (
    <BlueNavBar variant="dark">
      <Navbar.Brand href="/"><i className="fas fa-flask" /> DnD Mana Tracker</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">
          Home
        </Nav.Link>
        <Nav.Link href="/characters">
          Characters
        </Nav.Link>
        <Nav.Link href="/create-character">
          New Character
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
        </Dropdown.Menu>
      </WhiteDropDown>
    </BlueNavBar>
  );
}
