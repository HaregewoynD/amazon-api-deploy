import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { img } from './data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from '../Carousel/Carousel.module.css'
const CarouselEffect = () => {
  return (
    <div className={classes.hero__img}>
      <Carousel
        autoPlay={true}
        infiniteLoop={false}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imageItemLink, index) => (
            <img
              key={index}
              src={imageItemLink}
            />
          ))
        }
      </Carousel>
      <div className={classes.hero__img}></div>

    </div>
  );
};

export default CarouselEffect;
