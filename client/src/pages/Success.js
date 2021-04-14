import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

const Success = () => {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
    }

    saveOrder();
    setTimeout(() => {
      window.location.assign('/');
    }, 3000);
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success</h1>
        <h2>Thank you, your purchase is complete!!</h2>
        <h3>You will now be directed to the homepage</h3>
      </Jumbotron>
    </div>
  );
};

export default Success;
