import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/Firebase';
import { useNavigate } from 'react-router-dom';


const Type = {
  EMPTY_BASKET: 'EMPTY_BASKET'
};
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0)
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)

  const [cardError, setCardError] = useState(null)

  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()


  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError('');
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)
      const response = await axiosInstance({
        method: 'POST',
        url: `payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          },
        });
      // console.log(paymentIntent);
      if (error) {
        console.error("Payment confirmation error:", error);
        setCardError("Payment confirmation failed.");
        setProcessing(false);
        return;
      }
      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET })
      setProcessing(false);
      navigate('/orders', { state: { msg: 'you have placed Order' } })
    }
    catch (error) {
      // console.log(error);
      // setProcessing(false);
      console.error("Payment error:", error);
      setCardError("There was an error processing your payment. Please try again.");
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.payment__header}>Checkout({totalItem})items
      </div>
      <section className={classes.payment}>

        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>

            <div>{user?.email}</div>
            <div>Addis Ababa</div>
            <div>Ethiopia</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {
              basket?.map((item) => (<ProductCard key={item.id} product={item} flex={true} />))
            }
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__detail}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: 'red' }}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing ? (
                        <div className={classes.loading}>

                          <ClipLoader color='grey' size={12} />
                          <p>Please Wait ...</p>
                        </div>

                      ) : 'Pay Now'
                    }

                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </LayOut>
  )
}

export default Payment

