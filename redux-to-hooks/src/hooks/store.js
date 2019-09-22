import { useState, useEffect } from 'react';

let store = {};
let listeners = [];
let actions = {};

export const useStore = (listen = true) => {
  const setStore = useState(store)[1];

  const dispatch = action => {
    const { type, payload } = action;

    const newStore = actions[type](store, payload);
    store = { ...store, ...newStore };

    for (const listener of listeners) {
      listener(store);
    }
  };

  useEffect(() => {
    if (!listen) return;

    listeners.push(setStore);

    return () => {
      listeners = listeners.filter(l => l !== setStore);
    };
  }, [setStore, listen]);

  return [store, dispatch];
};

export const initStore = (newStore, newActions) => {
  if (newStore) {
    store = { ...store, ...newStore };
  }

  actions = { ...actions, ...newActions };
};
