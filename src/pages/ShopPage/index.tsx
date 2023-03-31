import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { CartContext } from '../../providers/CartContext';

import { StyledContainer } from '../../styles/grid';

const ShopPage = () => {
  const { modal } = useContext(CartContext);

  return (
    <><StyledShopPage>
      {modal && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
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

export default ShopPage;
