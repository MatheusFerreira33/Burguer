import { MdSearch } from 'react-icons/md';
import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext';

const SearchForm = () => {
  const { valueSeach, setValueSeach, renderDataSeach } = useContext(CartContext);

  return (
    <StyledSearchForm onSubmit={(event) => [event.preventDefault(), renderDataSeach(valueSeach)]}>
      <input onChange={(event) => { setValueSeach(event.target.value) }} type='text' placeholder='Digitar pesquisa' />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  )
};

export default SearchForm;
