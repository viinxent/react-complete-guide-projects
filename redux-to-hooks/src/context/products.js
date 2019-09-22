import React, { useState, createContext } from 'react';

export const ProductsContext = createContext({
  products: [],
  setFavorite: () => {}
});

export default props => {
  const [products, setProducts] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  const setFavorite = id => {
    setProducts(currProducts => {
      console.log(currProducts);

      const prodIndex = currProducts.findIndex(p => p.id === id);
      const newFavStatus = !currProducts[prodIndex].isFavorite;
      const updatedProducts = [...currProducts];

      updatedProducts[prodIndex] = {
        ...currProducts[prodIndex],
        isFavorite: newFavStatus
      };

      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, setFavorite }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
