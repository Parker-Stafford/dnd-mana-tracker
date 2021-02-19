import React from 'react';
import { FooterDiv, FooterIcon, Policy } from '../styles/Footer.styles';

export default function Footer() {
  return (
    <>
      <FooterDiv>
        <div><FooterIcon className="fas fa-flask" />DnD Mana Tracker</div>
        <div>Parker Stafford 2020
          <a href="https://github.com/Parker-Stafford/dnd-mana-tracker" target="_blank" rel="noreferrer">
            <FooterIcon className="fab fa-github" />
          </a>
        </div>
        <div>
          <a href="/privacy-policy.html">Privacy Policy</a>
          <Policy href="/cookie-policy.html">Cookie Policy</Policy>
        </div>
      </FooterDiv>
    </>
  );
}
