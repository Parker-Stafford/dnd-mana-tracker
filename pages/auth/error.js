import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/client';

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
      <div>{errMsg} {error}</div>
      {Object.values(provs).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => { signIn(provider.id, { callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign in with {provider.name}</button>
        </div>
      ))}
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
