import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';


const ProductList = () => {

  const { products, productSeach } = useContext(CartContext);

  return (
    <>
      {productSeach.length > 0 && productSeach.map((element => <h1 key={1}>Você pesquisou por:{element.name}<br /><br /></h1>))}
      <StyledProductList>
        {productSeach.length > 0 ? productSeach.map((element => (

          <ProductCard name={element.name} category={element.category} img={element.img} price={element.price} key={element.id} id={element.id} />

        ))) :
          products.map((element) =>
          (
            <ProductCard name={element.name} category={element.category} img={element.img} price={element.price} key={element.id} id={element.id} />
          )
          )

        }
      </StyledProductList>
    </>
  )
};

export default ProductList;
