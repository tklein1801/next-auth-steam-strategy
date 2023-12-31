'use client';

import {signIn as signOut} from 'next-auth/react';

export const SignOutBtn = () => {
  return <button onClick={() => signOut()}>Sign out</button>;
};
