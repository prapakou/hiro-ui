import HiroGraphMappings from "@hiro-graph/orm-mappings";

export const getMappings = () =>
  HiroGraphMappings.filter(m => m.name !== "AutomationVariable").map(m => {
    if (m.name === "AutomationAutomationIssue") {
      return {
        ...m,
        includeUnmappedFreeAttributes: true
      };
    }

    return m;
  });
