import { useEffect } from "react";

export const HiroDefaultTheme = () => {
  useEffect(() => {
    import("../style/default.less");
  }, []);

  return null;
};
