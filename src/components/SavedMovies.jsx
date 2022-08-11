import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContect";
import { db } from "../firebase";
import { onSnapshot, updateDoc, doc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

const SavedMovies = React.memo(() => {
  const [movies, setMovies] = useState([]);
  const [width, setWidth] = useState(0);
  const { user } = UserAuth();
  const carousel = useRef();

  const SlideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollTo({
      left: slider.scrollLeft - 500,
      behavior: "smooth",
    });
  };
  const SlideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollTo({
      left: slider.scrollLeft + 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies?.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SavedMovieRow>
      <section>
        <h2>My Movies</h2>
        <OneRow>
          <SlideBnt onClick={SlideLeft}>
            <IoIosArrowBack />
          </SlideBnt>
          <MovieRowContainer id={"slider"}>
            {movies?.map((item, id) => (
              <MovieContainer key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item?.img}`}
                  alt={item?.title}
                />
                <div>
                  <p>{item?.title}</p>
                  <span onClick={() => deleteMovie(item.id)}>
                    <MdDelete />
                  </span>
                </div>
              </MovieContainer>
            ))}
          </MovieRowContainer>
          <SlideBnt onClick={SlideRight}>
            <IoIosArrowForward />
          </SlideBnt>
        </OneRow>
        <OneRowOnMob ref={carousel}>
          <MovieRowContainerOnMob
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            id={"slider"}
          >
            {movies?.map((item, id) => (
              <MovieContainer key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item?.img}`}
                  alt={item?.title}
                />
                <div>
                  <p>{item?.title}</p>
                  <span onClick={() => deleteMovie(item.id)}>
                    <MdDelete />
                  </span>
                </div>
              </MovieContainer>
            ))}
          </MovieRowContainerOnMob>
        </OneRowOnMob>
      </section>
    </SavedMovieRow>
  );
});
const OneRowOnMob = styled(motion.div)`
  overflow: hidden;
  display: none;
  @media (max-width: 730px) {
    display: block;
  }
`;
const MovieRowContainerOnMob = styled(motion.div)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 20px 10px;
`;
const SavedMovieRow = styled.div`
  position: absolute;
  top: 55%;
  width: 100%;
  section {
    max-width: 1366px;
    width: 100%;
    margin: 0 auto;
    padding: 0 10px;
    h2 {
      color: #e0e0e0;
      margin: 20px 0;
      font-size: 20px;
    }
  }
`;
const OneRow = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  @media (max-width: 730px) {
    display: none;
  }
`;
const SlideBnt = styled.button`
  border-radius: 50%;
  border: none;
  outline: none;
  padding: 10px 12px;
  cursor: pointer;
  opacity: 0;
  ${OneRow}:hover & {
    opacity: 1;
  }
`;
const MovieRowContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin: 20px 10px;
  width: 100%;
`;
const MovieContainer = styled.div`
  margin-right: 10px;
  position: relative;
  div {
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
    p {
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      color: #fff;
    }
    span {
      color: #fff;
      margin: 10px;
      font-size: 20px;
      height: initial;
      width: initial;
      svg {
        -webkit-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
        :hover {
          color: red;
        }
      }
    }
  }
`;
export default SavedMovies;
