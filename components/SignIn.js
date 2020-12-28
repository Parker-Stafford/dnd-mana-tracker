import { signIn } from 'next-auth/client';

export default function SignIn() {
  return (
    <>
      <div>You&apos;re not signed in! Click the button below to sign in!</div>
      <button type="button" onClick={signIn}>Sign in</button>
    </>
  );
}
