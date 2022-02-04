import produce from 'immer';
import React, { useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Header from '../components/Header';

export enum SortType {
  top,
  down,
}

const Home: React.FC = () => {
  const [moviesData, setMoviesData] = useState<any[]>([]);

  const searchHandler = (data: []) => {
    setMoviesData(data);
  }

  const sortHandler = (type: SortType): void => {
    if (type === SortType.top) {
      let newArray = produce(moviesData, sortedMovies => {
        sortedMovies.sort((a, b) => {
          if (a.title < b.title) {return -1;}
          if (a.title > b.title) {return 1;}

          return 0;
        });
      });

      setMoviesData(newArray);
    } else if (type === SortType.down) {
      let newArray = produce(moviesData, sortedMovies => {
        sortedMovies.sort((a, b) => {
          if (a.title < b.title) {return 1;}
          if (a.title > b.title) {return -1;}

          return 0;
        });
      });

      setMoviesData(newArray);
    }
  }

  return (
      <div className="Home">
          <Header />
          <Form searchHandler={searchHandler} sortHandler={sortHandler} />

          <div className="movies">
            {moviesData.map((movie) => {
              return <Card key={movie.id} movie={movie} />
            })}
          </div>
      </div>
  );
}

export default Home;
