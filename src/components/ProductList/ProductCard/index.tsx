import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

interface iProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

const ProductCard = ({ id, name, category, price, img }: iProducts) => {
  const { getProductSelect } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>{price.toFixed(2)}</StyledParagraph>
        <StyledButton onClick={() => getProductSelect(id)} $buttonSize='medium' $buttonStyle='green' $id={id}>
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  )
};

export default ProductCard;
