import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContect";

const Header = React.memo(() => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HeaderContainer>
      <nav>
        <Link to="/">
          <h1>NETFLIX</h1>
        </Link>
        {user?.email ? (
          <div>
            <NavLinks to="account">
              <button>Account</button>
            </NavLinks>
            <NavLinks to="/">
              <button onClick={handleLogout}>Log Out</button>
            </NavLinks>
          </div>
        ) : (
          <div>
            <NavLinks to="/login">
              <button>Sign In</button>
            </NavLinks>
            <NavLinks to="/signup">
              <button>Sign Up</button>
            </NavLinks>
          </div>
        )}
      </nav>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.header`
  z-index: 10;
  position: absolute;
  width: 100%;
  nav {
    color: #fff;
    max-width: 1366px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  h1 {
    color: red;
  }
`;
const NavLinks = styled(Link)`
  background-color: red;
  border: none;
  outline: none;
  padding: 10px 20px;
  color: #fff;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  @media (max-width: 390px) {
    margin: 0 2px;
    padding: 10px 15px;
  }
  :hover {
    background-color: #d70000;
  }
  :first-child {
    background: transparent;
    :hover {
      -webkit-box-shadow: 0 0 5px #d6d6d6;
      box-shadow: 0 0 5px #d6d6d6;
    }
  }
  button {
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
  }
`;
export default Header;
