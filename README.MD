# Hiro UI [![npm (scoped)](https://img.shields.io/npm/v/@hiro-graph/ui.svg)](https://www.npmjs.com/package/@hiro-graph/ui)

This project is a wrapper for [Semantic UI React](https://react.semantic-ui.com/), it exists so that additional components can be added if needed.

Usage is identical, and theming continues to work - with themes managed [here](https://github.com/arago/hiro-ui-themes).

## Requirements

The upcoming React feature [hooks](https://reactjs.org/docs/hooks-overview.html) is used. Therefore React `^16.7.0-alpha.0` is required.

## Usage

The package should be installed directly from npm:

```bash
yarn add @hiro-graph/ui
```

Usage of `HiroApp` component injects themes and authentication support to your application:

```tsx
// App.tsx
import { HiroApp } from "@hiro-graph/ui";
import React from "react";

export default (props: IAppProps) => (
  <HiroApp theme="default" {...props}>
    Hello world!
  </HiroApp>
);
```

Usage with [hiro-sdk](https://www.npmjs.com/package/hiro-sdk) as follows:

```tsx
import { initSdk } from "hiro-sdk";
import React from "react";
import { render } from "react-dom";

import App from "./src/App";

initSdk().then(({ ready, orm, config }) =>
  render(<App ready={ready} orm={orm} config={config} />, target)
);
```

## Stores

Stores are prodived for data access, these use React [hooks](https://reactjs.org/docs/hooks-overview.html) and [RxJS](https://rxjs-dev.firebaseapp.com/) for data management.

- `authStore`: Authentication data (such as `token`, and `orm` access).
- `themeStore`: Current colour values of theme provided as JSON from CDN.
- `errorStore`: Global error setting and clearing. Value is overlayed on screen automatically.

The naming convention of `getters` and `actions` are used. e.g. `authStore.actions.ensureLogin()` or `authstore.getters.useAuth()`.
Getters with the naming convention `useXXX` are hooks, and should be used as such.

For example:

```js
// Hook to get colours. Once colours are loaded, the hook will force a component re-render
const getColour = themeStore.getters.useColour();

// Safely get colour from current data.
const blue = getColour("blue");
```

## Development

`index.tsx` and `index.html` are available for development using [Parcel](https://parceljs.org/). Parcel will automatically handle adding of additionald dependencies.

```bash
yarn start
```

Publishing and versioning (i.e. `npm version patch`) should be handled through npm.
