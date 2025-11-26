import axios from "axios";
import { generalErrorProcess } from "Api/api";
import { LoginResponse } from "Types/user";

export const userLogin = async (email: string, password: string) => {
  try {
    console.log(`${process.env.REACT_APP_BACK_END}/User/login`);
    const data = await axios.post<LoginResponse>(`${process.env.REACT_APP_BACK_END}/User/login`, {
      email,
      password
    });
        console.log(data);
        return data;
    } catch (error) {
        return generalErrorProcess(error, 'loginAPI');
    }
};

export const userRegister = async (email: string, password: string) => {
    try {
        const data = await axios.post<LoginResponse>(`${process.env.REACT_APP_BACK_END}/User/register`, {
          email,
          password
        });
        return data;
    } catch (error) {
        return generalErrorProcess(error, 'registerAPI');
    }
};