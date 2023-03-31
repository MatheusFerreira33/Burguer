
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../providers/UserContext';
import { iInputs } from '../../../providers/UserContext';


const RegisterForm = () => {
  const { getDatasFormRegister } = useContext(UserContext);


  const schema = yup.object().shape({
    name: yup.string().required('Nome Obrigatorio'),
    email: yup.string().required('Email obrigatorio').email('Email invalido'),
    password: yup.string().required('Senha obrigatoria').min(6, 'Senha com minimo 6 caracteres')
      .matches(/(\d)/, 'Deve ter pelo menos 1 numero')
      .matches(/[a-z]/, 'Deve ter pelo menos uma letra minuscula')
      .matches(/[A-Z]/, 'Deve ter pelo menos uma letra maiuscula')
      .matches(/(\W|_)/, 'Deve ter pelo menos 1 simbolo'),
    checkPassword: yup.string().oneOf([yup.ref('password')], 'Senhas não iguais')
  })



  const { register, handleSubmit, formState: { errors } } = useForm<iInputs>({
    resolver: yupResolver(schema)
  });

  return (

    <><StyledForm onSubmit={handleSubmit(getDatasFormRegister)}>
      <Input type='text' nameInput='name' label='Nome' register={register} error={errors.name?.message} />
      <Input type='email' nameInput='email' label='Email' register={register} error={errors.email?.message} />
      <Input type='password' nameInput='password' label='Senha' register={register} error={errors.password?.message} />
      <Input type='password' nameInput='checkPassword' label='Confimar senha' register={register} error={errors.checkPassword?.message} />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
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

export default RegisterForm;
