export enum ECommunityVisibilityState {
  Private = 1,
  Public = 3,
}

export enum EPersonState {
  Offline = 0,
  Online = 1,
  Busy = 2,
  Away = 3,
  Snooze = 4,
  LookingToTrade = 5,
  LookingToPlay = 6,
}

export type TSteamProfile = {
  steamid: string;
  communityvisibilitystate: ECommunityVisibilityState;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: EPersonState;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  commentpermission: boolean;
};
