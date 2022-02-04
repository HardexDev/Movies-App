import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  movie: any;
}

const Card: React.FC<Props> = (props) => {
  const basePosterUrl: string = "https://www.themoviedb.org/t/p/w500";

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const synopsisPagination = (synopsis: string): string => {
    let res: string = "";
    let words = synopsis.split(" ");

    const maxCharaters = 220;

    for (let word of words) {
      let temp = res + word + " ";
      if (temp.length <= maxCharaters) {
        res += word + " ";
      } else {
        res += "..."
        break;
      }
    }

    return res;
  }

  return (
      <div className="Card">
          <div className="header">
            <h2 className={props.movie.title.length >= 30 ? "small-title" : ""}>{props.movie.title}</h2>
            <p onClick={() => {setIsFavorite(!isFavorite)}} className={isFavorite ? "favorite" : ""}>{isFavorite ? "❤" : "♡"}</p>
          </div>
          
          <div className="flex-container">
            <img src={props.movie.backdrop_path ? basePosterUrl + props.movie.backdrop_path : "/assets/poster_template.jpg"} alt="" />
            <p>Release Date : {props.movie.release_date}</p>
            <p>Rating (average) : {props.movie.vote_average} <span>★</span></p>
            <div className="synopsis">
              <p>Synospis</p>
              <p>{synopsisPagination(props.movie.overview)}</p>
            </div>

            <NavLink to={`/details/${props.movie.id}`}><button>More details ➜</button></NavLink>
          </div>
          
      </div>
  );
};

export default Card;
