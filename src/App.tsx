import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

const App: React.FC = () => {
  useEffect(() => {
    window.localStorage.language = "fr-FR";
    window.localStorage.searchContent = "";
    window.localStorage.saveSearchContent = 0;
    window.localStorage.scrollYPosition = 0;
  }, []);

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

