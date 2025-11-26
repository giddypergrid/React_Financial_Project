import { createContext, useEffect, useState } from "react";
import { UserInfo } from "Types/user";
import { useNavigate } from "react-router-dom";
import { userLogin, userRegister } from "Api/userApi";
import { toast } from "react-toastify";
import check_response from "Api/apiProcess";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserInfo | null;
  token: string | null;
  registerUser: (email: string, password: string, from?: string) => void;
  loginUser: (username: string, password: string, from?: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const removeUserCache = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const setUserCache = (user: UserInfo, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const userObj: UserInfo = JSON.parse(storedUser);
      setUser(userObj);
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
      setIsLoggedIn(true);
    }
  }, []);

  const registerUser = async (email: string, password: string, from?: string) => {
    const response = await userRegister(email, password);

    if (check_response(response)) {
      const newUser: UserInfo = {
        Id: response.data.Id,
        Email: response.data.Email,
      };

      setUserCache(newUser, response.data.Token);
      setUser(newUser);
      setToken(response.data.Token);

      toast.success("Register Success!");
      navigate(from || "/", { replace: true });
    } else {
      toast.error("Register Failed!");
    }
  };

  const loginUser = async (username: string, password: string, from?: string) => {
    const response = await userLogin(username, password);

    if (check_response(response)) {
      const newUser: UserInfo = {
        Id: response.data.Id,
        Email: response.data.Email,
      };

      setUserCache(newUser, response.data.Token);
      setUser(newUser);
      setToken(response.data.Token);

      toast.success("Login Success!");
      navigate(from || "/", { replace: true });
    } else {
      toast.error("Login Failed!");
    }
  };

  const logout = () => {
    removeUserCache();
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const contextValue: UserContextType = {
    user,
    token,
    registerUser,
    loginUser,
    logout,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value= {contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
