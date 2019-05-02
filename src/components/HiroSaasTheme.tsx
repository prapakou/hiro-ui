import { useEffect } from "react";

export const HiroSaasTheme = () => {
  useEffect(() => {
    import("../style/saas.less");
  }, []);

  return null;
};
