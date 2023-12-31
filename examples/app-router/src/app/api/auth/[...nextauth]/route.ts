import NextAuth from 'next-auth/next';
import {type NextRequest} from 'next/server';
import SteamProvider from '@tklein1801/next-auth-steam-strategy';

async function handler(req: NextRequest, ctx: {params: {nextauth: string[]}}) {
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET as string,
        callbackUrl: 'http://localhost:3000/api/auth/callback',
      }),
    ],
  });
}

export {handler as GET, handler as POST};
