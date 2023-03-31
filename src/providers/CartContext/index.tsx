import { AxiosError } from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { iResponseErrorForm } from '../UserContext';


interface iTypeChildren {
  children: React.ReactNode;
}

export interface iProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
interface iCounters {
  id: number;
  count: number;
  price: number;
  detect: number;
}


interface iCartContext {
  modal: boolean;
  setModal: (boolean: boolean) => void;
  products: Array<iProducts>;
  setProducts: React.Dispatch<React.SetStateAction<Array<iProducts>>>;
  getProductSelect: (id: number) => void;
  productSelect: Array<iProducts>;
  setProductSelect: React.Dispatch<React.SetStateAction<Array<iProducts>>>;
  sum: number;
  deleteProduct: (idProduct: number) => void;
  valueSeach: string;
  setValueSeach: React.Dispatch<React.SetStateAction<string>>;
  renderDataSeach: (value: string) => void;
  productSeach: Array<iProducts>;
  sumCounter: (idProductSelect: number, price: number) => void;
  saveInfoCounter: (id: number, counter: number, price: number, detect: number) => void;
  counter: iCounters[];
  lessCounter: (idProductSelect: number, number: number) => void;
  setCounter: React.Dispatch<React.SetStateAction<iCounters[]>>;
  counterProductSelect: number;
}




export const CartContext = createContext({} as iCartContext)

const CartProviders = ({ children }: iTypeChildren) => {

  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState(Array<iProducts>);
  const [productSelect, setProductSelect] = useState(Array<iProducts>);
  const [sum, setSum] = useState<number>(0);
  const [valueSeach, setValueSeach] = useState('');
  const [productSeach, setProductSeach] = useState(Array<iProducts>);
  const [counter, setCounter] = useState<iCounters[]>([]);
  const [counterProductSelect, setCounterProductSelect] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || "");
    async function getProducts() {
      try {
        const result = await api.get<Array<iProducts>>('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProducts([...result.data]);
      }
      catch (errors) {
        const currentError = errors as AxiosError<iResponseErrorForm>;
        if (currentError.response?.data) {
          navigate('/');
        }
      }
    }
    getProducts();

  }, []);

  useEffect(() => {
    const result = productSelect.map(element => (element.price));
    const add = result.reduce((acc, currentValues) => acc + currentValues, 0);
    setSum(add);

    setCounterProductSelect(productSelect.length);

  }, [productSelect])

  const getProductSelect = async (id: number) => {

    try {
      const token = JSON.parse(localStorage.getItem('token') || "");
      const result = await api.get<Array<iProducts>>('/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const findProduct = Array.from(result.data).find(element => element.id === id);
      const response = productSelect.find(element => element.id === findProduct?.id);

      if (response === undefined) {
        setProductSelect([...productSelect, findProduct as iProducts]);
        toast.success('Produto adcionado no carrinho');
      } else {
        toast.warning('Esse produto foi somado no carrinho');
        productSelect.find(element => {
          if (element.id == findProduct?.id) {
            element.price = element.price + findProduct.price;
          }
        })
        const check = counter.find(element => {
          if (element.id == findProduct?.id) {
            element.count = element.count + 1;
            return findProduct;
          }
        })


        if (counter.length == 0) {
          const intermedy: iCounters = {
            id: findProduct?.id as number,
            price: findProduct?.price as number,
            count: 1,
            detect: 2,
          }
          setCounter([intermedy])
        }
        setProductSelect([...productSelect]);
        if (check == undefined) {
          const intermedy: iCounters = {
            id: findProduct?.id as number,
            price: findProduct?.price as number,
            count: 1,
            detect: 2,
          }
          setCounter([...counter, intermedy])

        }
      }
    } catch (errors) {
      const currentError = errors as AxiosError<iResponseErrorForm>;
      if (currentError.response?.data) {
        navigate('/');
      }
    }

  }

  const deleteProduct = (idProduct: number) => {
    const positon = productSelect.findIndex((element) => element.id === idProduct);
    productSelect.splice(positon, 1);
    setProductSelect([...productSelect]);
  };

  const renderDataSeach = (value: string) => {

    if (value.length === 0) {
      toast.warning('Digite alguma coisa');

    } else {
      const result = products.filter(element => element.name.toLowerCase().includes(value.toLowerCase()));
      if (result.length === 0) {
        toast.error('Não temos esse produto');
      }
      setProductSeach([...result]);
    }
  }

  const sumCounter = async (idProductSelect: number) => {
    try {
      const token = JSON.parse(localStorage.getItem('token') || "");
      const result = await api.get<Array<iProducts>>('/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const price = result.data.find(element => element.id === idProductSelect) as iProducts;

      const findProduct = Array.from(productSelect).find(element => {
        if (element.id === idProductSelect) {
          element.price = element.price + price.price;
          return productSelect;
        }
      });

      setProductSelect([...productSelect]);
    } catch (errors) {
      const currentError = errors as AxiosError<iResponseErrorForm>;
      if (currentError.response?.data) {
        navigate('/');
      }
    }

  }
  const lessCounter = async (idProductSelect: number, number: number) => {

    if (number == 1) {

    } else {
      try {
        const token = JSON.parse(localStorage.getItem('token') || "");
        const result = await api.get<Array<iProducts>>('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const price = result.data.find(element => element.id === idProductSelect) as iProducts;

        const findProduct = Array.from(productSelect).find(element => {
          if (element.id === idProductSelect) {
            element.price = element.price - price.price;
            return productSelect;
          }
        });

        setProductSelect([...productSelect]);
      } catch (errors) {
        const currentError = errors as AxiosError<iResponseErrorForm>;
        if (currentError.response?.data) {
          navigate('/');
        }
      }
    }
  }

  const saveInfoCounter = (id: number, count: number, price: number, detect: number) => {

    const value = counter.find(element => element.id === id);


    if (value == undefined) {

      setCounter([...counter, { id, count, price, detect }])
    } else {
      value.price = (count + 1) * price;
      value.count = count;
      value.detect = detect;

    }
  }

  return (
    <CartContext.Provider value={{ modal, setModal, products, setProducts, getProductSelect, productSelect, setProductSelect, sum, deleteProduct, valueSeach, setValueSeach, renderDataSeach, productSeach, sumCounter, saveInfoCounter, counter, lessCounter, setCounter, counterProductSelect }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProviders;