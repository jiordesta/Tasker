import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, login, register } from "../redux/reducers/authSlice";
import { error, success } from "../redux/reducers/notificationSlice";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch();
  const viewportHeight = window.innerHeight;
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const handleRegister = (inputs) => {
    dispatch(register(inputs)).then((response) => {
      if (response.error) {
        for (const message of response.error.message.split(",")) {
          dispatch(error(message));
        }
      } else {
        dispatch(success("Successfully Created an Account!"));
        setShowRegister(false);
      }
    });
  };
  const handleLogin = (inputs) => {
    dispatch(login(inputs)).then((response) => {
      if (response.error) {
        for (const message of response.error.message.split(",")) {
          dispatch(error(message));
        }
      } else {
        dispatch(success("Successfully Login!"));
        navigate("/");
      }
    });
  };
  return (
    <div className="container">
      {showRegister ? (
        <Register
          setShowRegister={setShowRegister}
          viewportHeight={viewportHeight}
          register={handleRegister}
        />
      ) : (
        <Login
          setShowRegister={setShowRegister}
          viewportHeight={viewportHeight}
          login={handleLogin}
        />
      )}
    </div>
  );
}
