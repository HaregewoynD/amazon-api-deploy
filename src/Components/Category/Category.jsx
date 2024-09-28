import React from 'react';
import CategoryCard from './CategoryCard';
import { CategoryInfos } from './CategoryFullInfo';
import classes from './Category.module.css';

const Category = () => {
  return (
    <section className={classes.category__container}>
      {
        CategoryInfos.map((infos) => (
          <CategoryCard key={infos.id} data={infos} />
        ))
      }
    </section>

  );
};

export default Category;
