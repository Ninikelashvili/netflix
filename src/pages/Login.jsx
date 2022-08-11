import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContect";

const Login = React.memo(() => {
  const { logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginPage>
      <span>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/489c65c0-ba9a-4567-99f5-14e9f775fcdc/GE-en-20220801-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div></div>
      </span>
      <FormContent>
        <section>
          <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>Sign In</button>
              <div>
                <div>
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <p>Need Help?</p>
              </div>
              <div>
                <p>
                  New to Netflix?{" "}
                  <Link to="/signup">
                    <strong>Sign In</strong>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </FormContent>
    </LoginPage>
  );
});
const LoginPage = styled.div`
  width: 100%;
  z-index: 5;
  padding-top: 100px;
  max-width: 1366px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 100px 10px 0 10px;
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 80%
      );
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
const FormContent = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 75vh;
  section {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-top: 20px;
    div {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      max-width: 400px;
      width: 100%;
      max-height: 600px;
      height: 100%;
      background-color: #000;
      opacity: 0.8;
      padding: 50px;
      @media (max-width: 400px) {
        padding: 50px 20px;
      }
      h2 {
        color: #fff;
        margin-bottom: 20px;
      }
      form {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        width: 100%;
        input {
          width: 100%;
          padding: 15px 20px;
          margin: 10px 0;
          border: none;
          outline: none;
        }
        button {
          width: 100%;
          padding: 15px 20px;
          background-color: red;
          border: none;
          outline: none;
          color: #fff;
          cursor: pointer;
          margin-top: 20px;
        }
        div {
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 0;
          :nth-child(1) {
            margin: 10px 0;
          }
          div {
            color: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            max-width: 40%;
            width: 100%;
            @media (max-width: 390px) {
              max-width: 55%;
            }
            p {
              @media (max-width: 390px) {
                font-size: 12px;
              }
              font-size: 15px;
              color: #fff;
              :hover {
                cursor: pointer;
                text-decoration: none !important;
              }
            }
            input {
              width: initial;
              margin-right: 5px;
              cursor: pointer;
            }
          }
          p {
            @media (max-width: 390px) {
              font-size: 12px;
            }
            color: #fff;
            font-size: 15px;
            -webkit-transition: all 0.5 ease;
            -o-transition: all 0.5 ease;
            transition: all 0.5 ease;
            :hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
        div {
          :last-child {
            margin-top: 20px;
          }
          p {
            color: #fff;
            font-size: 15px;
            @media (max-width: 390px) {
              font-size: 12px;
            }
            :hover {
              text-decoration: none;
            }
            strong {
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

export default Login;
