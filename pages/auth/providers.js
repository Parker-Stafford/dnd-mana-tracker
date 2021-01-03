import React from 'react';
import { getProviders, signIn } from 'next-auth/client';
import GoogleIcon from '../../components/GoogleIcon';
import {
  FBButton,
  FBIcon,
  GButton,
  GText,
  ProvidersWrapper,
  Title,
  ProviderDiv,
} from '../../styles/providers.styles';

export default function SignIn({ provs }) {
  return (
    <>
      <ProvidersWrapper>
        <Title>Welcome to D&D Mana Tracker!</Title>
        {Object.values(provs).map((provider) => (
          <ProviderDiv key={provider.name}>
            {provider.name === 'Google' && (
              <GButton type="button" onClick={() => { signIn(provider.id); }}>
                <GoogleIcon />
                <GText>Sign in with Google</GText>
              </GButton>
            )}
            {provider.name === 'Facebook' && (
              <FBButton type="button" onClick={() => { signIn(provider.id); }}>
                <FBIcon className="fab fa-facebook" />
                <div>Sign in with Facebook</div>
              </FBButton>
            )}
          </ProviderDiv>
        ))}
      </ProvidersWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const provs = await getProviders();
  return {
    props: {
      provs,
    },
  };
}
