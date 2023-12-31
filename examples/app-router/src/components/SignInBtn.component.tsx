'use client';

import {signIn} from 'next-auth/react';

export const SignInBtn = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};
