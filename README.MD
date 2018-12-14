# Hiro UI [![npm (scoped)](https://img.shields.io/npm/v/@hiro-graph/ui.svg)](https://www.npmjs.com/package/@hiro-graph/ui)

This project is a wrapper for [Semantic UI React](https://react.semantic-ui.com/), it exists so that additional components can be added if needed.

Usage is identical, and theming continues to work - with themes managed [here](https://github.com/arago/hiro-ui-themes).

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

## Development

`index.tsx` and `index.html` are available for development using [Parcel](https://parceljs.org/). Parcel will automatically handle adding of additionald dependencies.

```bash
yarn start
```

Publishing and versioning (i.e. `npm version patch`) should be handled through npm.
