import React, { useState } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContect";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function Movie({ item }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Login to save movie");
    }
  };
  return (
    <MovieContainer>
      <img
        src={`https://image.tmdb.org/t/p/w300/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div>
        <p>{item?.title}</p>
        <span onClick={saveMovie}>{like ? <FaHeart /> : <FaRegHeart />}</span>
      </div>
    </MovieContainer>
  );
}
const MovieContainer = styled.div`
  margin-right: 10px;
  position: relative;
  div {
    @media (max-width: 1000px) {
      opacity: 1;
      background-color: transparent;
    }
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    height: 100%;
    width: 100%;
    opacity: 0;
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    padding: 20px;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
    span {
      @media (max-width: 1000px) {
        position: absolute;
        top: 80%;
      }
    }
    p {
      @media (max-width: 1000px) {
        top: 85%;
        background-color: #000;
        padding: 15px 50px;
      }
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      @media (max-width: 1000px) {
        font-weight: 200;
        font-size: 13px;
        margin-bottom: 2px;
      }
    }
  }
`;
export default Movie;
