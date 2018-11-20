const store = new Map();
export const HiroAppStore = {
  get: (key: "token" | "orm" | "me" | string) => {
    return store.get(key);
  },
  set: (key, value) => {
    return store.set(key, value);
  }
};
