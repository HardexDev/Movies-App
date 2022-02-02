import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:movieId" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

