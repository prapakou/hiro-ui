const store = new Map();
export const HiroAppStore = {
  get: (key: "token" | "orm" | "me" | string) => store.get(key),
  has: store.has,
  set: store.set
};
