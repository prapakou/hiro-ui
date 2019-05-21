import { configure } from "@storybook/react";
// automatically import all files ending in *.stories.tsx
const req = require.context("../stories", true, /\.stories\.tsx$/);

function themesFirst(a: string, b: string) {
  if (a.includes("themes")) {
    return -1;
  } else if (b.includes("themes")) {
    return 1;
  }

  return 0;
}

function loadStories() {
  req
    .keys()
    .sort(themesFirst)
    .forEach(req);
}

configure(loadStories, module);
