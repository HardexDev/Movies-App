import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Header from "../components/Header";
import { checkLanguage, usToFrenchDate } from '../Utils';

const Details: React.FC = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<any>(null);
  const [movieCredits, setMovieCredits] = useState<any>(null);
  const [movieProviders, setMovieProviders] = useState<any>(null);
  const [similarMovies, setSimilarMovies] = useState<any>(null);

  const basePosterUrl: string = "https://www.themoviedb.org/t/p/w500";
  const baseLargePosterUrl: string = "https://www.themoviedb.org/t/p/original";

  const getMovieDirector = (): string => {
    let res: string = "";

    movieCredits.crew.forEach((crewMember: any) => {
      if (crewMember.job === "Director") {
        res = crewMember.name;
        return;
      }
    });

    return res;
  }

  useEffect(() => {
    // Main movie data
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}`)
        .then(res => {setMovie(res.data); console.log(res.data)});

    // Movie credits data
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}`)
    .then(res => {setMovieCredits(res.data); console.log(res.data)});

    // Movie providers data
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}`)
    .then(res => {console.log(res.data.results); setMovieProviders(res.data.results)});

    // Similar movies data
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}`)
    .then(res => {console.log(res.data.results); setSimilarMovies(res.data.results)});

    // Go back to top of the page
    window.scroll(0,0);

  }, [movieId]);

  return (
      <div className="Details">
        <Header />
        <main>
            {movie === null || movieCredits === null || movieProviders === null || similarMovies === null ?<div className="movie-container"><div className='loader'></div></div> :
              <div className="movie-container">
                  <h1>{movie.title}</h1>
                  <div className="content">
                    <div className="poster-container">
                      <img className="poster" src={movie.backdrop_path ? baseLargePosterUrl + movie.backdrop_path : "/assets/poster_template.jpg"} alt="" />
                    </div>
                    
                    <div className="movie-info">
                      <p><span>{checkLanguage() ? "Date de sortie" : "Release Date"} : </span>{checkLanguage() ? usToFrenchDate(movie.release_date) : movie.release_date}</p>
                      <p><span>{checkLanguage() ? "Note (moyenne)" : "Rating (average)"} : </span>{movie.vote_average}/10 <span className="star">★</span></p>
                      <p><span>{checkLanguage() ? "Réalisateur" : "Director"} : </span>{getMovieDirector()}</p>
                      <p><span>Genres : </span></p>
                      <div className="genres">
                        {movie.genres.map((genre: any) => {
                          return <div key={genre.name} className="genre">{genre.name}</div>
                        })}
                      </div>
                      <p className="synopsis"><span>Synopsis : </span>{movie.overview}</p>
                      
                      <p><span>{checkLanguage() ? "Distribution" : "Cast"} : </span></p>
                      <div className="cast">
                        {movieCredits.cast.map((castMember: any) => {
                          return <div key={castMember.cast_id} className="castMember">
                            <img src={castMember.profile_path ? basePosterUrl + castMember.profile_path : "/assets/no_profile.png"} alt="" />
                            <p>{castMember.name}</p>
                          </div>
                        })}
                      </div>

                      <div className="providers">
                        <p><span>{checkLanguage() ? "Voir en streaming" : "Watch in streaming"}</span></p>
                        <div className="streaming">
                          {movieProviders.FR ? (movieProviders.FR.flatrate ? movieProviders.FR.flatrate.map((provider: any) => {
                            return <div className="provider" key={provider.provider_id}>
                              <img src={basePosterUrl + provider.logo_path} alt="" />
                              <p>{provider.provider_name}</p>
                            </div>
                          }) : checkLanguage() ? "Pas disponible en France" : "Not available in France") : checkLanguage() ? "Pas disponible en France" : "Not available in France"}
                        </div>
                        
                        

                        <p><span>{checkLanguage() ? "Voir en VOD" : "Watch in VOD"}</span></p>
                        <div className="vod">
                          {movieProviders.FR ? (movieProviders.FR.rent ? movieProviders.FR.rent.map((provider: any) => {
                              return <div className="provider" key={provider.provider_id}>
                                <img src={basePosterUrl + provider.logo_path} alt="" />
                                <p>{provider.provider_name}</p>
                              </div>
                          }) : checkLanguage() ? "Pas disponible en France" : "Not available in France") : checkLanguage() ? "Pas disponible en France" : "Not available in France"}
                        </div>
                      </div>

                    </div>
                    
                  </div>
                  <h2 className="similar-movies-title">{checkLanguage() ? "Films similaires" : "Similar movies"}</h2>
                  <div className="similar-movies">
                    {similarMovies.slice(0,8).map((movie: any) => {
                      return <Card key={movie.id} movie={movie} />
                    })}
                  </div>
                  
              </div> 
            }
        </main>
      </div>
  );
};

export default Details;
