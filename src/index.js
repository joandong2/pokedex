import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import 'tw-elements';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// fetch all pokemon on store dispatch
//store.dispatch(fetchPokemon());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </Router>
  </Provider>
);
