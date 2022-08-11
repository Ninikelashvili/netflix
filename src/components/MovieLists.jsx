import React from "react";
import Row from "./Row";
import requests from "../Requests";
import styled from "styled-components";

const MovieLists = React.memo(() => {
  return (
    <ListContainer>
      <Row rowID="1" title="Upcoming" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Top Rate" fetchURL={requests.requestTopRate} />
      <Row rowID="4" title="Horror" fetchURL={requests.requestHorror} />
    </ListContainer>
  );
});
const ListContainer = styled.div`
  width: 100%;
`;
export default MovieLists;
