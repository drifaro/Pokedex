import React from 'react';
import Pokedex from './pokedex/Pokedex';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>

        <AppRoutes />

      </BrowserRouter>
    </>
  )
}

export default App;
