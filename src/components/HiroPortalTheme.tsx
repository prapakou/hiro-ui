import { useEffect } from "react";

export const HiroPortalTheme = () => {
  useEffect(() => {
    import("../style/portal.less");
  }, []);

  return null;
};
