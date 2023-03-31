import { MdDelete } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { StyledCartProductCard } from './style';
import { CartContext, iProducts } from '../../../../providers/CartContext';
import { StyledTitle } from '../../../../styles/typography';

const CartProductCard = ({ name, img, id, price }: iProducts) => {
  const { deleteProduct, sumCounter, saveInfoCounter, counter, lessCounter } = useContext(CartContext);
  const [counter2, setCounter2] = useState(1);


  useEffect(() => {

    counter.find(element => {
      if (element.id === id) {
        if (element.detect == 2) {
          setCounter2(element.count + 1);

        } else if (element.detect == 1) {
          setCounter2(element.count - 1);
        }
      }

    })

  }, [])

  useEffect(() => {
    if (counter2 == 0) {
      setCounter2(1);
    }
  }, [counter2])

  const deleteProductCounter2 = (id: number) => {
    const index = counter.findIndex((element, index) => element.id == id);
    counter.splice(index, 1);

  }


  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>

        <StyledTitle tag='h3' $fontSize='three'>
          {name}
          <div className='contador'>
            <button onClick={() => { setCounter2(counter2 - 1), lessCounter(id, counter2), saveInfoCounter(id, counter2, price, 1) }}>-</button>
            <span>{counter2}</span>
            <button onClick={() => { sumCounter(id, price), setCounter2(counter2 + 1), saveInfoCounter(id, counter2, price, 2) }}>+</button>
          </div>
        </StyledTitle>
        <button onClick={() => [deleteProduct(id), deleteProductCounter2(id)]} type='button' aria-label='Remover'>
          <MdDelete size={24} />
        </button>

      </div>
    </StyledCartProductCard>
  )
};

export default CartProductCard;
