import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';

import { ToastContainer } from 'react-toastify';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../providers/UserContext';

import 'react-toastify/dist/ReactToastify.css';


interface FormData {
  name: string;
  email: string;
  password: string;
  checkPassword: string;

}

const LoginForm = () => {
  const { getDatasFormLogin } = useContext(UserContext);

  const schemas = yup.object().shape({
    email: yup.string().required('Email obrigatorio').email('Email invalido'),
    password: yup.string().required('Senha obrigatoria')
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schemas)
  });

  return (
    <><StyledForm onSubmit={handleSubmit(getDatasFormLogin)}>
      <Input label='Email' nameInput='email' type='email' register={register} error={errors.email?.message} />
      <Input label='Senha' nameInput='password' type='password' register={register} error={errors.password?.message} />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /></>
  )
};

export default LoginForm;
