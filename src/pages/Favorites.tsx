import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import {checkLanguage} from '../Utils';

const Favorites: React.FC = () => {
  const [favMoviesData, setFavMoviesData] = useState<any[]>([]);

  const updateFavorites = (): void => {
    let movieIds = loadFromLocalStorage()[0];

    if (favMoviesData.length !== 0) {
      setFavMoviesData([]);
    }

    const fetchData = async () => {
      let newData: any[] = [];
      movieIds.forEach((movieId) => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}`)
        .then(res => {setFavMoviesData(arr => [...arr, res.data])});
      });
    }

    fetchData();
  }

  useEffect(() => {
    updateFavorites();
  }, []);

  const loadFromLocalStorage = (): [[], boolean] => {
    return window.localStorage.movies ? [window.localStorage.movies.split(","), true] : [[], false];
  }

  return (
      <div className="Favorites">
        <Header />
        <h2 className='subtitle'><span>❤ </span>{checkLanguage() ? "Mes coups de coeurs" : "My favorite movies"}<span> ❤</span></h2>
        <div className={favMoviesData.length === 0 ? "favorite-movies flex" : "favorite-movies"}>
          {favMoviesData.length !== 0 ? favMoviesData.map(movie => {
            return <Card key={movie.id} movie={movie} updateFavorites={updateFavorites} />
          }) : <h2 className="fav-empty">{checkLanguage() ? "Pas de coups de coeur pour le moment" : "No favorite movies at the moment"}</h2>}
        </div>
      </div>
  );
};

export default Favorites;
