import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import { TopBar } from "../TopBar";

test("Renders", () => {
  const component = renderer.create(
    <BrowserRouter>
      <TopBar title="Test" />
    </BrowserRouter>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
