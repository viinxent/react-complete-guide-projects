import React from 'react';

import { useStore } from '../hooks/store';

import FavoriteItem from '../components/Favorites/FavoriteItem';

import './Products.css';

const Favorites = () => {
  const [state] = useStore();
  const favoriteProducts = state.products.filter(p => p.isFavorite);
  const noFavorites = <p className="placeholder">Got no favorites yet!</p>;

  if (favoriteProducts.length <= 0) {
    return noFavorites;
  }

  return (
    <ul className="products-list">
      {favoriteProducts.map(prod => (
        <FavoriteItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
        />
      ))}
    </ul>
  );
};

export default Favorites;
