import {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON
} from "react-test-renderer";

export const getTree = (component: ReactTestRenderer) => {
  const tree = (component.toJSON() as any) as ReactTestRendererJSON[];

  const style = tree.find(el => el.type === "link");
  if (style) {
    act(() => {
      style.props.onLoad();
    });
    return (component.toJSON() as any) as ReactTestRendererJSON[];
  }

  return tree;
};
