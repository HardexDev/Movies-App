import React from 'react';

interface Props {
  movie: any;
}

const Card: React.FC<Props> = (props) => {
  const basePosterUrl: string = "https://www.themoviedb.org/t/p/w500";

  return (
      <div className="Card">
          <div className="header">
            <h2>{props.movie.title}</h2>
            <p>♡</p>
          </div>
          
          <div className="flex-container">
            <img src={basePosterUrl + props.movie.backdrop_path} alt="" />
            <p>Release Date : {props.movie.release_date}</p>
            <p>Rating (average) : {props.movie.vote_average} <span>★</span></p>
            <div className="synopsis">
              <p>Synospis</p>
              <p>{props.movie.overview.substring(0, 200)}</p>
            </div>

            <button>More details ➜</button>
          </div>
          
      </div>
  );
};

export default Card;
