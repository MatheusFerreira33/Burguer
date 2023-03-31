import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { iProducts } from '../../providers/CartContext';
import { iResponseErrorForm, UserContext } from "../../providers/UserContext";
import api from '../../services/api';

const ProtectedRoutes = () => {
  const { checkUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser) {
      navigate('/')
    } else {
      const token = JSON.parse(localStorage.getItem('token') || "");
      async function getProducts() {
        try {
          const result = await api.get<Array<iProducts>>('/products', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }
        catch (errors) {
          const currentError = errors as AxiosError<iResponseErrorForm>;
          if (currentError.response?.data) {
            navigate('/');
          }
        }
      }
      getProducts();
    }
  }, [])

  return (
    <div>
      {checkUser ? <Outlet /> : <Navigate to='/' />}
    </div>

  )

}

export default ProtectedRoutes;