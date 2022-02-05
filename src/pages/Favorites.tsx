import produce from 'immer';
import React, { useState } from 'react';
import Header from '../components/Header';

const Favorites: React.FC = () => {
  const [favMoviesData, setFavMoviesData] = useState<any[]>([]);

  return (
      <div className="Favorites">
        <Header />
        <div className="favorite-movies">
  
        </div>
      </div>
  );
};

export default Favorites;
