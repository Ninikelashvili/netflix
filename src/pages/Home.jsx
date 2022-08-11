import React from "react";
import MainSection from "../components/MainSection";
import MovieLists from "../components/MovieLists";

const Home = React.memo(() => {
  return (
    <>
      <MainSection />
      <MovieLists />
    </>
  );
});

export default Home;
