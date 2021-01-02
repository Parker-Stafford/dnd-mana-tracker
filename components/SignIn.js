import React from 'react';
import { signIn } from 'next-auth/client';
import { SignInMessage, ButtonWrapper } from '../styles/SignIn.styles';
import { BlueButton } from '../styles/index.styles';

export default function SignIn() {
  return (
    <>
      <SignInMessage>You&apos;re not signed in! Click the button below to sign in!</SignInMessage>
      <ButtonWrapper>
        <BlueButton type="button" onClick={signIn}>Sign in</BlueButton>

      </ButtonWrapper>
    </>
  );
}
