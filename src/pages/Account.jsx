import React from "react";
import styled from "styled-components";
import SavedMovies from "../components/SavedMovies";

const Account = React.memo(() => {
  return (
    <AccountContainer>
      <span>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/489c65c0-ba9a-4567-99f5-14e9f775fcdc/GE-en-20220801-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div></div>
      </span>
      <SavedMovies />
    </AccountContainer>
  );
});
const AccountContainer = styled.div`
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
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
export default Account;
