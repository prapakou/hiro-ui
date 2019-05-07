# Hiro UI - Bootstrap [![npm (scoped)](https://img.shields.io/npm/v/@hiro-ui/bootstrap.svg)](https://www.npmjs.com/package/@hiro-ui/bootstrap)[![Build Status](https://travis-ci.org/arago/hiro-ui.svg?branch=feature%2F1.0)](https://travis-ci.org/arago/hiro-ui)

This project provides standardised components, themes and rendering for Hiro Apps.
By rendering your React app as a Hiro App; Authentication, ORM, Redux store and Routing are all handled for you.
Additionally, Hiro UI Themes are provided and work in conjunction with the underlying Semantic UI components to provide re-usable React components.

## Usage

First create your React app using the [create-react-app](https://github.com/facebook/create-react-app) tool.

```bash
yarn create react-app my-app --typescript
```

Follow the given instructions.

Secondly, add `@hiro-ui/bootstrap` as a dependency:

```bash
yarn add @hiro-ui/bootstrap
```

Last but not least, replace your DOM render call in `index.tsx`:

```diff
--- a/src/index.tsx
+++ b/src/index.tsx
@@ -1,10 +1,10 @@
 import React from 'react';
-import ReactDOM from 'react-dom';
+import { HiroApp } from '@hiro-ui/bootstrap';
 import './index.css';
 import App from './App';
 import * as serviceWorker from './serviceWorker';
 
-ReactDOM.render(<App />, document.getElementById('root'));
+new HiroApp().render(<App />, document.getElementById('root'));
```

## Graph and ORM

Access to the graph requires a valid Client ID and graph URL.
These can be set using a `.env` file in your project.

1. Create a file called `.env` alongside your `package.json` file.
2. Fill it with the following:

```ini
REACT_APP_GRAPH_URL=https://graph.arago.co
REACT_APP_CLIENT_ID=MYCLIENTID
```

That's it! Now try starting your app again with `yarn start`.

### Note
You can optionally specificy redirect and authentication endpoints in your `.env` also.

```ini
REACT_APP_GRAPH_URL=https://graph.arago.co
REACT_APP_AUTH_URL=https://graph.arago.co/api/6/auth/ui/
REACT_APP_REDIRECT_URL=https://graph.arago.co/api/6/auth/ui-redirect
REACT_APP_CLIENT_ID=MYCLIENTID
```