
import { toast } from 'react-toastify';

import { createContext, useState, useEffect } from "react";
import { SubmitHandler } from 'react-hook-form'
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import { iResponseFormResgister } from "../@types/types";


interface iUser {
  accessToken: string;
  user: iResponseFormResgister;
}
export interface iResponseErrorForm {
  error: string;
}

export interface iInputs {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

interface typeChildren {
  children: React.ReactNode;
}

interface iUserContext {
  getDatasFormRegister: (datas: iInputs) => void;
  checkUser: iUser | boolean;
  setCheckUser: React.Dispatch<React.SetStateAction<iUser | boolean>>
  getDatasFormLogin: (datas: iInputs) => void;
  logout: () => void;
}


export const UserContext = createContext({} as iUserContext);


const UserProvider = ({ children }: typeChildren) => {
  const [checkUser, setCheckUser] = useState<iUser | boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setCheckUser(true);
      navigate('/checkUser');
    }

  }, [])

  const getDatasFormRegister: SubmitHandler<iInputs> = async (datas) => {
    try {
      const response = await api.post<iUser>('/users', datas)
      toast.success('Cadastro feito com sucesso');
      localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      setCheckUser(response.data);
      setTimeout(() => { navigate('/') }, 1000);
    }
    catch (error) {
      const currentError = error as AxiosError<iResponseErrorForm>
      toast.error('Esse email ja existe');
    }
  };

  const getDatasFormLogin: SubmitHandler<iInputs> = async (datas) => {
    try {
      const response = await api.post<iUser>('/login', datas);
      toast.success('Login feito com sucesso');
      localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      setCheckUser(response.data);
      setTimeout(() => { navigate('/checkUser') }, 1000);
    }
    catch (error) {
      const currentError = error as AxiosError<iResponseErrorForm>
      toast.error('Email ou senha invalidos');
    }
  }



  return (
    <UserContext.Provider value={{ getDatasFormRegister, checkUser, setCheckUser, getDatasFormLogin, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;