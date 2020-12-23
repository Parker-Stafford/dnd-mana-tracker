import React from 'react';
import { providers, signIn } from 'next-auth/client';

export default function SignIn({ provs }) {
  console.log(process.env.NEXTAUTH_URL);
  return (
    <>
      {Object.values(provs).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => { signIn(provider.id, { callbackUrl: `${process.env.NEXTAUTH_URL}` }); }}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      provs: await providers(),
    },
  };
}
