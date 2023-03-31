import { red } from '@mui/material/colors';
import { ReactNode } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';


interface IFormValues {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

interface iNameInputs {
  nameInput: Path<IFormValues>;
  label: string;
  type: string;
  register: UseFormRegister<IFormValues>
  error: ReactNode;
}

const Input = ({ nameInput, label, type, register, error }: iNameInputs) => (
  <fieldset>
    <StyledTextField label={label} placeholder={nameInput} type={type}  {...register(nameInput)} />
    <StyledParagraph>
      <strong>{error && [error]}</strong>
    </StyledParagraph>
  </fieldset>
);

export default Input;
