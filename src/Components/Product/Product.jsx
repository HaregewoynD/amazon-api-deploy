import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css'
import { Box } from '@mui/material';
import Loader from '../../Components/Loader/Loader'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      });

  }, [])

  return (
    <>

      {
        isLoading ? (<Loader />) : (<Box className={classes.products_container}>
          {
            products?.map((singleProduct) => {
              return <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
            })
          }
        </Box>)
      }
    </>
  )
}

export default Product;