import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer, { fetchPosts } from './features/pokeSlice.js'
import { Provider } from 'react-redux';

const store = configureStore({
  pokemon : pokemonReducer
})

store.dispatch(fetchPosts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
