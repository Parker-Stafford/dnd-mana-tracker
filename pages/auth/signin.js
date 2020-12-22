import React from 'react';
import { providers, signIn } from 'next-auth/client';

export default function SignIn({ provs }) {
  return (
    <>
      {Object.values(provs).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => { signIn(provider.id); }}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  // console.log(context);
  return {
    props: {
      provs: await providers(),
    },
  };
}
