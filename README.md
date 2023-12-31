# next-auth-steam-strategy

## ToC

- [next-auth-steam-strategy](#next-auth-steam-strategy)
  - [ToC](#toc)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Setup](#setup)
  - [Credits](#credits)

> [!IMPORTANT]
> Mainly based on [next-auth-steam](https://github.com/Nekonyx/next-auth-steam) but has working types (as of 31.12.2023)

## Getting Started

### Installation

1. Install package

   ```bash
   npm i @tklein1801/next-auth-steam-strategy
   ```

2. Obtain a Steam Web API key under [Steam-Community](https://steamcommunity.com/dev/apikey) and expose it as the environment-variable `STEAM_SECRET`

### Setup

1. Set all required environment variables

   ```txt
   STEAM_SECRET=
   NEXTAUTH_SECRET=ultra-long-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

2. Choose a template from [`examples`](./examples/)

## Credits

| Name                                                | Information                 |
| --------------------------------------------------- | --------------------------- |
| [svgrepo](https://www.svgrepo.com/svg/314707/steam) | Took the Steam logo from it |
