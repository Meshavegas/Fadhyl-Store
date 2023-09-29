"use client";
import React, { ReactNode, useState } from "react";

import { User } from "../../types/modele/user";
import { UserContext } from "./userContext";
interface IProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IProps) => {
  const [user, setProduct] = useState<User | null>(null);

  const login = (p: User) => {
    setProduct(p);
    localStorage.setItem("user", JSON.stringify(p));
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
