import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Row = React.memo(({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const SlideLeft = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollTo({
      left: slider.scrollLeft - 500,
      behavior: "smooth",
    });
  };
  const SlideRight = () => {
    let slider = document.getElementById("slider" + rowID);
    slider.scrollTo({
      left: slider.scrollLeft + 500,
      behavior: "smooth",
    });
  };

  return (
    <MovieRow>
      <h2>{title}</h2>
      <OneRow>
        <SlideBnt onClick={SlideLeft}>
          <IoIosArrowBack />
        </SlideBnt>
        <MovieRowContainer id={"slider" + rowID}>
          {movies?.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </MovieRowContainer>
        <SlideBnt onClick={SlideRight}>
          <IoIosArrowForward />
        </SlideBnt>
      </OneRow>
      <OneRowOnMob ref={carousel} whileTap={{ cursor: "grabbing" }}>
        <MovieRowContainerOnMob
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          id={"slider" + rowID}
        >
          {movies?.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </MovieRowContainerOnMob>
      </OneRowOnMob>
    </MovieRow>
  );
});
const OneRowOnMob = styled(motion.div)`
  overflow: hidden;
  cursor: -webkit-grab;
  cursor: grab;
  display: none;
  width: 100%;
  @media (max-width: 1000px) {
    display: block;
  }
`;
const MovieRowContainerOnMob = styled(motion.div)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 20px 10px;
  width: 100%;
`;
const MovieRowContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin: 20px 10px;
`;
const OneRow = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media (max-width: 1000px) {
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

const MovieRow = styled.div`
  h2 {
    margin-top: 50px;
    font-size: 15px;
  }
  max-width: 1366px;
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
  color: #fff;
`;

export default Row;
