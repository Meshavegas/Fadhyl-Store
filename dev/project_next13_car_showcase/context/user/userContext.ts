import { User } from "../../types/modele/user";
import { createContext, useContext } from "react";

interface IProductContext {
  user: User | null;
  login: (product: User) => void;
}

export const UserContext = createContext<IProductContext>({
  user: null,
  login(data) {},
});

export const useUserContext = () => useContext(UserContext);
