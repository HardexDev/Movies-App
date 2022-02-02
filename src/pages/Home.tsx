import React, { useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [moviesData, setMoviesData] = useState<any[]>([]);

  const searchHandler = (data: []) => {
    setMoviesData(data);
    console.log(moviesData);
  }

  return (
      <div className="Home">
          <Header />
          <Form searchHandler={searchHandler}/>

          <div className="movies">
            {moviesData.map((movie) => {
              return <Card key={movie.id} movie={movie} />
            })}
          </div>
      </div>
  );
}

export default Home;
