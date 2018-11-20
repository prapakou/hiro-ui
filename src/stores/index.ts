const store = new Map();
export const HiroAppStore = {
  get: (key: "token" | "orm" | "me" | string) => store.get(key),
  has: key => store.has(key),
  set: (key, value) => store.set(key, value)
};
