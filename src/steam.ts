import {type NextApiRequest} from 'next';
import {type NextRequest} from 'next/server';
import {type OAuthConfig, type OAuthUserConfig} from 'next-auth/providers';
import {randomUUID} from 'crypto';
import {RelyingParty} from 'openid';
import {TokenSet} from 'openid-client';
import {type TSteamProfile} from './type';

export const PROVIDER_ID = 'steam';
export const PROVIDER_NAME = 'Steam';

export interface ISteamStrategyOptions extends Partial<OAuthUserConfig<TSteamProfile>> {
  /**
   * The Steam API key.
   * @see https://steamcommunity.com/dev/apikey
   */
  clientSecret: string;
  /**
   * Your callback URL.
   * @example http://localhost:3000/api/auth/callback/steam
   */
  callbackUrl: string;
}

export function Steam(req: NextApiRequest | NextRequest, options: ISteamStrategyOptions): OAuthConfig<TSteamProfile> {
  const callbackUrl = new URL(options.callbackUrl);
  const realm = callbackUrl.origin;
  const returnTo = `${callbackUrl.href}/${PROVIDER_ID}`;
  const baseImageUrl =
    'https://raw.githubusercontent.com/tklein1801/next-auth-steam-strategy/cec729c6a85c91c0fc3b053d46e59aeeb0ed4134/src/assets';
  return {
    ...options,
    id: PROVIDER_ID,
    name: PROVIDER_NAME,
    type: 'oauth',
    style: {
      logo: baseImageUrl + '/steam-light.svg',
      logoDark: baseImageUrl + '/steam-dark.svg',
      bg: '#fff',
      text: '#000',
      bgDark: '#000',
      textDark: '#fff',
    },
    idToken: false,
    checks: ['none'],
    clientId: PROVIDER_ID,
    authorization: {
      url: 'https://steamcommunity.com/openid/login',
      params: {
        'openid.mode': 'checkid_setup',
        'openid.ns': 'http://specs.openid.net/auth/2.0',
        'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
        'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
        'openid.return_to': returnTo,
        'openid.realm': realm,
      },
    },
    token: {
      async request() {
        const claimedIdentifier = await verifyAssertion(req.url!, realm, returnTo);
        if (!claimedIdentifier) {
          throw new Error('Unauthenticated');
        }

        const matches = claimedIdentifier.match(/^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/);
        if (!matches) {
          throw new Error('Unauthenticated');
        }

        return {
          tokens: new TokenSet({
            id_token: randomUUID(),
            access_token: randomUUID(),
            steamId: matches[1],
          }),
        };
      },
    },
    userinfo: {
      async request(ctx) {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${ctx.provider.clientSecret}&steamids=${ctx.tokens.steamId}`;
        const response = await fetch(url);
        const json = await response.json();
        return json.response.players[0];
      },
    },
    profile(profile: TSteamProfile) {
      // next.js can't serialize the session if email is missing or null, so I specify user ID
      return {
        id: profile.steamid,
        image: profile.avatarfull,
        email: profile.steamid,
        name: profile.personaname,
      };
    },
  };
}

/**
 * Verifies an assertion and returns the claimed identifier if authenticated, otherwise null.
 */
async function verifyAssertion(url: string, realm: string, returnTo: string): Promise<string | null> {
  const party = new RelyingParty(returnTo, realm, true, false, []);

  const result: {
    authenticated: boolean;
    claimedIdentifier?: string | undefined;
  } = await new Promise((resolve, reject) => {
    party.verifyAssertion(url, (error, result) => {
      if (error) return reject(error);
      resolve(result!);
    });
  });

  if (!result.authenticated) {
    return null;
  }

  return result.claimedIdentifier!;
}
