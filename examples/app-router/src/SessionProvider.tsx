'use client';

import React from 'react';
import {SessionProvider as NextAuthSessionProvider} from 'next-auth/react';

export const SessionProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
