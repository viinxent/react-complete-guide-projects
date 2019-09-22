import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import { useStore } from '../hooks/store';

import './Products.css';

const Products = () => {
  const [store] = useStore();

  return (
    <ul className="products-list">
      {store.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
