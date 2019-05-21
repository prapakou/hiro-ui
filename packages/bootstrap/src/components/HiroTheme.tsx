import { useEffect } from "react";

const HiroDefaultTheme = () => {
  useEffect(() => {
    import(`../style/default.less`);
  }, []);

  return null;
};
const HiroPortalTheme = () => {
  useEffect(() => {
    import(`../style/portal.less`);
  }, []);

  return null;
};

const HiroSaasTheme = () => {
  useEffect(() => {
    import(`../style/saas.less`);
  }, []);

  return null;
};

export const HiroTheme = {
  Default: HiroDefaultTheme,
  Portal: HiroPortalTheme,
  SAAS: HiroSaasTheme
};
