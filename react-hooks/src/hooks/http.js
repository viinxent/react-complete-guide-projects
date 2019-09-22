import { useReducer, useCallback } from 'react';

const initialState = {
  method: '',
  loading: false,
  error: null,
  data: null,
  extra: null
};

const requestReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        method: action.payload.method,
        loading: true,
        error: null,
        extra: action.payload.extra
      };

    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      throw new Error('Unknown action');
  }
};

const useRequest = () => {
  const [request, requestDispatch] = useReducer(requestReducer, initialState);
  const sendRequest = useCallback((url, method, body, extra) => {
    requestDispatch({ type: 'REQUEST', payload: { extra, method } });

    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => requestDispatch({ type: 'SUCCESS', payload: data }))
      .catch(error =>
        requestDispatch({ type: 'ERROR', payload: error.message })
      );
  }, []);

  const clearError = useCallback(() => {
    requestDispatch({ type: 'ERROR', payload: null });
  }, []);

  return { ...request, sendRequest, clearError };
};

export default useRequest;
