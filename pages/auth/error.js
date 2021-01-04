import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/client';
import GoogleIcon from '../../components/GoogleIcon';
import {
  FBButton,
  FBIcon,
  GButton,
  GText,
  ProvidersWrapper,
  ProviderDiv,
  Title,
} from '../../styles/providers.styles';

export default function Error({ provs }) {
  const [error, setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    let err = window.location.search.split('=');
    err = err[err.length - 1];
    setError(err);
  }, []);
  useEffect(() => {
    if (error === 'OAuthAccountNotLinked') {
      setErrMsg('It seems you already have an account, please use the same sign in method you used initially.');
    } else {
      setErrMsg('Unexpected error occured please try again.');
    }
  }, [error]);
  return (
    <>
      <ProvidersWrapper>
      <Title>{errMsg}</Title>
        {Object.values(provs).map((provider) => (
          <ProviderDiv key={provider.name}>
            {provider.name === 'Google' && (
              <GButton type="button" onClick={() => { signIn(provider.id, { callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>
                <GoogleIcon />
                <GText>Sign in with Google</GText>
              </GButton>
            )}
            {provider.name === 'Facebook' && (
              <FBButton type="button" onClick={() => { signIn(provider.id, { callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>
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
