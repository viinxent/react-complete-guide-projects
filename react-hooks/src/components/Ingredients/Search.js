import React, { useState, useEffect } from 'react';

import useRequest from '../../hooks/http';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import './Search.css';

const Search = React.memo(props => {
  const { onSearch } = props;
  const [search, setSearch] = useState('');
  const { clearError, data, error, loading, sendRequest } = useRequest();

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const query =
        search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
      sendRequest(
        'https://react-hooks-c0ab2.firebaseio.com/ingredients.json' + query,
        'GET'
      );
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [search, sendRequest]);

  useEffect(() => {
    if (loading || error || !data) return;

    const loadedIngredients = [];

    for (const key in data) {
      loadedIngredients.push({ id: key, ...data[key] });
    }

    onSearch(loadedIngredients);
  }, [data, loading, error, onSearch]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
