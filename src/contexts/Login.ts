import { createContext } from "react";

export interface IHiroLoginContext {
  me?: any;
  orm?: any;
  token?: string;
}

export const HiroLoginContext = createContext<IHiroLoginContext>({});
