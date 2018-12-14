# Hiro UI [![npm (scoped)](https://img.shields.io/npm/v/@hiro-graph/ui.svg)](https://www.npmjs.com/package/@hiro-graph/ui)

This project is a wrapper for [Semantic UI React](https://react.semantic-ui.com/), it exists so that additional components can be added if needed.

Usage is identical, and theming continues to work - with themes managed [here](https://github.com/arago/hiro-ui-themes).

## Usage

The package should be installed directly from npm:

```bash
yarn add @hiro-graph/ui
```

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

## Development

`index.tsx` and `index.html` are available for development using [Parcel](https://parceljs.org/). Parcel will automatically handle adding of additionald dependencies.

```bash
yarn start
```

Publishing and versioning (i.e. `npm version patch`) should be handled through npm.
