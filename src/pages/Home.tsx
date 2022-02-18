import produce from 'immer';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Header from '../components/Header';

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

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
    let newArray = produce(moviesData, sortedMovies => {
      sortedMovies.sort((a, b) => {
        if (a.title < b.title) {return type === SortType.top ? -1 : 1;}
        if (a.title > b.title) {return type === SortType.top ? 1 : -1;}

        return 0;
      });
    });

    setMoviesData(newArray);
  }

  useEffect(() => {
    console.log("Bonjour");
    scroll.scrollTo(window.localStorage.scrollYPosition, {
      smooth: 'easeInOutQuint',
      duration: 800,
      delay: 0
    });
    window.localStorage.scrollYPosition = 0;
  }, []);

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
