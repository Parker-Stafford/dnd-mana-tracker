import React from 'react';
import { signIn } from 'next-auth/client';
import {
  MainTitle,
  TitleDiv,
  SignInButton,
  CallToSignIn,
  SignInWrapper,
} from '../styles/MainSignIn.styles';

export default function MainSignIn() {
  return (
    <>
      <TitleDiv>
        <MainTitle><i className="fas fa-flask" /> DnD Mana Tracker</MainTitle>
      </TitleDiv>
      <SignInWrapper>
        <CallToSignIn>Click below to sign in or sign up!</CallToSignIn>
        <SignInButton type="button" onClick={signIn}>Sign in</SignInButton>
      </SignInWrapper>
    </>
  );
}
