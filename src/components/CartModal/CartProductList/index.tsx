import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { productSelect, sum, setProductSelect, setCounter } = useContext(CartContext);
  return (
    <StyledCartProductList>
      <ul>
        {productSelect.map(element =>
        (
          <CartProductCard key={element.id} name={element.name} img={element.img} price={element.price} category={element.category} id={element.id} />
        )

        )}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>{`R$ ${sum.toFixed(2)}`}</StyledParagraph>
      </div>
      <StyledButton onClick={() => [setProductSelect([]), setCounter([])]} $buttonSize='default' $buttonStyle='gray'>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  )
};

export default CartProductList;
