import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import React, { useEffect, useState } from 'react';
import {SortType} from "../pages/Home"
import {checkLanguage} from '../Utils';

interface Props {
  searchHandler(data: object[]): void;
  sortHandler(type: SortType): void;
}

const Form: React.FC<Props> = (props) => {
  const [searchContent, setSearchContent] = useState<string>("");
  
  // Will be called each time the searchContent state is modified
  useEffect(() => {
    // If search field is empty, get current popular movies
    if (searchContent === "") {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}&page=1&include_adult=true`)
          .then(data => {props.searchHandler(data.data.results)})
    } else {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=40ddc708cabcc62d933f378fdb056886&language=${window.localStorage.getItem("language")}&page=1&include_adult=true&query=${searchContent}`)
          .then(data => {props.searchHandler(data.data.results)});
    }

  }, [searchContent]);

  return (
      <div className="Form">
        <input type="text" placeholder={checkLanguage() ? "Rechercher un film" : "Search for a movie"} onChange={(e) => {setSearchContent(e.target.value)}}/>
        <div className="sort-buttons">
          <button className="sort-dsc" onClick={() => {props.sortHandler(SortType.top)}}><span>➜</span> A-Z</button>
          <button className="sort-asc" onClick={() => {props.sortHandler(SortType.down)}}><span>➜</span> Z-A</button>
        </div>
      </div>
  );
};

export default Form;
