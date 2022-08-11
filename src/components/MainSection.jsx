import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../Requests";
import styled from "styled-components";

const MainSection = React.memo(() => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  // console.log(movie);

  const owerviewlength = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <MainContainer>
      <span>
        <div></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      </span>
      <MainContent>
        <section>
          <h2>{movie?.title}</h2>
          <div>
            <button>Play</button>
            <button>Watch Later</button>
          </div>
          <p>Released: {movie?.release_date}</p>
          <p>{owerviewlength(movie?.overview, 150)}</p>
        </section>
      </MainContent>
    </MainContainer>
  );
});
const MainContent = styled.div`
  section {
    position: absolute;
    z-index: 30;
  }
  padding-top: 10%;
  h2 {
    color: #e0e0e0;
    margin-bottom: 30px;
  }
  p {
    color: #adadad;
    margin-top: 20px;
    max-width: 60%;
    width: 100%;
    :last-child {
      margin-top: 5px;
    }
  }
  button {
    background: transparent;
    padding: 12px 20px;
    border: solid 1px #e0e0e0;
    outline: none;
    color: #e0e0e0;
    margin-right: 10px;
    font-size: 18px;
    cursor: pointer;
    font-weight: 100;
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    :hover {
      background-color: #e0e0e0;
      color: #000;
    }
    :first-child {
      background-color: #e0e0e0;
      color: #000;
      :hover {
        background: transparent;
        color: #e0e0e0;
      }
    }
  }
`;
const MainContainer = styled.div`
  width: 100%;
  z-index: 5;
  padding-top: 100px;
  max-width: 1366px;
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  padding: 100px 10px 0 10px;
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0);
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(rgba(0, 0, 0, 1)),
        color-stop(80%, rgba(0, 0, 0, 0))
      );
      background: -o-linear-gradient(
        left,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 80%
      );
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 80%
      );
    }
    img {
      height: 100%;
      width: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }
`;
export default MainSection;
