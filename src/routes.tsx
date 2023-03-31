import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import CartProviders from './providers/CartContext';
import ProtectedRoutes from './pages/ProtectedRoutes';

const Router = () => {

  console.log()

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      <Route path='/checkUser' element={<ProtectedRoutes />}>
        <Route index element={<CartProviders><ShopPage /> </CartProviders>} />
      </Route>

    </Routes>
  );
};

export default Router;
