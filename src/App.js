import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.scss';
import { CategoriesContainer } from './components/CategoriesContainer';

function App() {
  return (
    <Provider store={store}>
      <CategoriesContainer />
    </Provider>
  );
}

export default App;
