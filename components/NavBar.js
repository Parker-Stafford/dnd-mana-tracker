import React from 'react';
import { signOut } from 'next-auth/client';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  BlueNavBar,
  WhiteDropDown,
  WhiteToggle,
  BrandFont,
} from '../styles/index.styles';

export default function NavBar({ session }) {
  return (
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
      </Nav>
      <WhiteDropDown>
        <WhiteToggle>
          {session.user.email}
        </WhiteToggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { signOut(); }}>
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </WhiteDropDown>
    </BlueNavBar>
  );
}
