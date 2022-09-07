import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer, { fetchPokemon } from './features/pokeSlice.js'
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    pokemon : pokemonReducer
  }
})

// fetch all pokemon on store dispatch
store.dispatch(fetchPokemon());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
