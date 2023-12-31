import {type NextApiRequest, type NextApiResponse} from 'next';
import NextAuth from 'next-auth/next';
import SteamProvider from '@tklein1801/next-auth-steam-strategy';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET as string,
        callbackUrl: 'http://localhost:3000/api/auth/callback',
      }),
    ],
  });
}
